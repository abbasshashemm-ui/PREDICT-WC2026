import { useEffect, useMemo, useState, type RefObject } from 'react';
import type { Match } from '../types';
import {
  bracketNodeKey,
  buildAdvancementLinks,
  type BracketAdvancementLink,
} from '../logic/bracketVisuals';

interface Point {
  x: number;
  y: number;
}

interface RenderedPath {
  id: string;
  d: string;
  active: boolean;
}

function anchorPoint(
  rect: DOMRect,
  container: DOMRect,
  side: 'left' | 'right',
  slot: 'home' | 'away' | 'center',
): Point {
  const x =
    side === 'right'
      ? rect.right - container.left
      : rect.left - container.left;
  const slotRatio = slot === 'home' ? 0.32 : slot === 'away' ? 0.68 : 0.5;

  return {
    x,
    y: rect.top - container.top + rect.height * slotRatio,
  };
}

function buildConnectorPath(from: Point, to: Point): string {
  const gap = Math.max(24, (to.x - from.x) * 0.45);
  const c1x = from.x + gap;
  const c2x = to.x - gap;
  return `M ${from.x} ${from.y} C ${c1x} ${from.y}, ${c2x} ${to.y}, ${to.x} ${to.y}`;
}

function resolvePath(
  link: BracketAdvancementLink,
  nodes: Map<string, HTMLElement>,
  container: HTMLElement,
): RenderedPath | null {
  const fromKey = bracketNodeKey(link.fromMatchId, 'card');
  const toKey = bracketNodeKey(link.toMatchId, link.toSlot);
  const fromEl = nodes.get(fromKey);
  const toEl = nodes.get(toKey);
  if (!fromEl || !toEl) return null;

  const containerRect = container.getBoundingClientRect();
  const fromRect = fromEl.getBoundingClientRect();
  const toRect = toEl.getBoundingClientRect();

  const start = anchorPoint(fromRect, containerRect, 'right', 'center');
  const end = anchorPoint(toRect, containerRect, 'left', link.toSlot);

  return {
    id: `${link.fromMatchId}-${link.toMatchId}-${link.toSlot}`,
    d: buildConnectorPath(start, end),
    active: link.active,
  };
}

interface BracketPathwaysProps {
  matches: Match[];
  nodesRef: RefObject<Map<string, HTMLElement>>;
  containerRef: RefObject<HTMLElement | null>;
  version: number;
}

export function BracketPathways({
  matches,
  nodesRef,
  containerRef,
  version,
}: BracketPathwaysProps) {
  const [paths, setPaths] = useState<RenderedPath[]>([]);

  const links = useMemo(() => buildAdvancementLinks(matches), [matches]);

  useEffect(() => {
    const container = containerRef.current;
    const nodes = nodesRef.current;
    if (!container || !nodes) {
      setPaths([]);
      return;
    }

    const next = links
      .map((link) => resolvePath(link, nodes, container))
      .filter((path): path is RenderedPath => Boolean(path));

    setPaths(next);
  }, [links, nodesRef, containerRef, version]);

  useEffect(() => {
    const container = containerRef.current;
    const nodes = nodesRef.current;
    if (!container || !nodes) return;

    const refresh = () => {
      const next = links
        .map((link) => resolvePath(link, nodes, container))
        .filter((path): path is RenderedPath => Boolean(path));
      setPaths(next);
    };

    const observer = new ResizeObserver(refresh);
    observer.observe(container);
    window.addEventListener('resize', refresh);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', refresh);
    };
  }, [links, nodesRef, containerRef]);

  if (paths.length === 0) return null;

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible"
      aria-hidden
    >
      <defs>
        <linearGradient id="bracket-path-active" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="50%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#6ee7b7" />
        </linearGradient>
      </defs>
      {paths.map((path) => (
        <path
          key={path.id}
          d={path.d}
          fill="none"
          className={path.active ? 'bracket-path bracket-path--active' : 'bracket-path'}
          stroke={path.active ? 'url(#bracket-path-active)' : undefined}
        />
      ))}
    </svg>
  );
}
