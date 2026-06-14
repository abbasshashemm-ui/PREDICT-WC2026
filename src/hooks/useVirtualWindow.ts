import { useEffect, useState, type RefObject } from 'react';

export interface UseVirtualWindowOptions {
  /** Expand the viewport detection band (e.g. pre-mount nearby rows). */
  rootMargin?: string;
  /** When false, the slot is always treated as visible (desktop passthrough). */
  enabled?: boolean;
}

/**
 * Intersection-observer hook — true when the target element is inside (or near) the viewport.
 */
export function useVirtualWindow(
  ref: RefObject<Element | null>,
  options: UseVirtualWindowOptions = {},
): boolean {
  const { rootMargin = '280px 0px', enabled = true } = options;
  const [visible, setVisible] = useState(() => !enabled);

  useEffect(() => {
    if (!enabled) {
      setVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) setVisible(entry.isIntersecting);
      },
      { root: null, rootMargin, threshold: 0 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [enabled, rootMargin]);

  return visible;
}
