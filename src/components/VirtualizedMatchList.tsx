import { memo, useRef, type ReactNode } from 'react';
import { useVirtualWindow } from '../hooks/useVirtualWindow';

export const DEFAULT_MATCH_SLOT_HEIGHT = 96;
export const LIVE_MATCH_SLOT_HEIGHT = 112;

export function MatchRowSkeleton({ height = DEFAULT_MATCH_SLOT_HEIGHT }: { height?: number }) {
  return (
    <div
      className="match-row-skeleton h-full w-full overflow-hidden rounded-lg border border-slate-800/70 bg-slate-900/35"
      style={{ height }}
      aria-hidden
    >
      <div className="flex h-full flex-col justify-center gap-2 px-3 py-2">
        <div className="flex items-center justify-between">
          <div className="h-2 w-16 animate-pulse rounded bg-slate-700/80" />
          <div className="h-2 w-10 animate-pulse rounded bg-slate-700/60" />
        </div>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="h-4 w-6 shrink-0 animate-pulse rounded-sm bg-slate-700/70" />
            <div className="h-2.5 flex-1 animate-pulse rounded bg-slate-700/60" />
          </div>
          <div className="h-8 w-14 animate-pulse rounded-md bg-slate-800/90" />
          <div className="flex items-center justify-end gap-1.5">
            <div className="h-2.5 w-12 animate-pulse rounded bg-slate-700/60" />
            <div className="h-4 w-6 shrink-0 animate-pulse rounded-sm bg-slate-700/70" />
          </div>
        </div>
      </div>
    </div>
  );
}

interface VirtualMatchSlotProps {
  height: number;
  enabled: boolean;
  children: ReactNode;
}

const VirtualMatchSlot = memo(function VirtualMatchSlot({
  height,
  enabled,
  children,
}: VirtualMatchSlotProps) {
  const ref = useRef<HTMLLIElement>(null);
  const visible = useVirtualWindow(ref, { enabled, rootMargin: '320px 0px' });

  return (
    <li
      ref={ref}
      className="virtual-match-slot contain-layout contain-paint [content-visibility:auto]"
      style={{ height, minHeight: height }}
    >
      {enabled && !visible ? <MatchRowSkeleton height={height} /> : children}
    </li>
  );
});

interface VirtualizedSectionProps {
  height: number;
  enabled: boolean;
  className?: string;
  children: ReactNode;
}

export function VirtualizedSection({
  height,
  enabled,
  className = '',
  children,
}: VirtualizedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useVirtualWindow(ref, { enabled, rootMargin: '480px 0px' });

  return (
    <div
      ref={ref}
      className={`contain-layout contain-paint [content-visibility:auto] ${className}`}
      style={{ minHeight: height }}
    >
      {enabled && !visible ? (
        <div
          className="w-full overflow-hidden rounded-2xl border border-slate-800/70 bg-slate-900/40"
          style={{ height }}
          aria-hidden
        >
          <div className="border-b border-slate-800/60 px-4 py-3">
            <div className="h-4 w-24 animate-pulse rounded bg-slate-700/70" />
          </div>
          <div className="space-y-2 p-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <MatchRowSkeleton key={index} />
            ))}
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  );
}

export interface VirtualizedMatchListProps<T> {
  items: T[];
  itemKey: (item: T) => string;
  itemHeight: number;
  enabled?: boolean;
  className?: string;
  renderItem: (item: T) => ReactNode;
}

export function VirtualizedMatchList<T>({
  items,
  itemKey,
  itemHeight,
  enabled = true,
  className = '',
  renderItem,
}: VirtualizedMatchListProps<T>) {
  const virtualize = enabled;

  if (!virtualize) {
    return (
      <ul className={`flex flex-col gap-2 ${className}`}>
        {items.map((item) => (
          <li key={itemKey(item)}>{renderItem(item)}</li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={`flex flex-col gap-2 ${className}`}>
      {items.map((item) => (
        <VirtualMatchSlot key={itemKey(item)} height={itemHeight} enabled>
          {renderItem(item)}
        </VirtualMatchSlot>
      ))}
    </ul>
  );
}
