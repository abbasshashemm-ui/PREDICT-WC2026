import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
  type RefObject,
} from 'react';

interface BracketNodeContextValue {
  register: (key: string, element: HTMLElement | null) => void;
  containerRef: RefObject<HTMLElement | null>;
}

const BracketNodeContext = createContext<BracketNodeContextValue | null>(null);

export function BracketNodeProvider({
  children,
  containerRef,
  register,
}: {
  children: ReactNode;
  containerRef: RefObject<HTMLElement | null>;
  register: (key: string, element: HTMLElement | null) => void;
}) {
  const value = useMemo(
    () => ({ register, containerRef }),
    [register, containerRef],
  );

  return (
    <BracketNodeContext.Provider value={value}>{children}</BracketNodeContext.Provider>
  );
}

export function useBracketNodeRegistry() {
  const ctx = useContext(BracketNodeContext);
  if (!ctx) {
    throw new Error('useBracketNodeRegistry must be used within BracketNodeProvider');
  }
  return ctx;
}

export function useBracketAnchorRef(key: string) {
  const { register } = useBracketNodeRegistry();

  return useCallback(
    (element: HTMLElement | null) => {
      register(key, element);
    },
    [key, register],
  );
}
