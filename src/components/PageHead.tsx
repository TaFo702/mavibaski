import { createContext, useContext, useEffect, useId, useLayoutEffect, useState, type ReactNode } from 'react';
import { Helmet as ServerHelmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { childrenToHead, HeadRegistry } from '../utils/headRegistry';

const HeadContext = createContext<HeadRegistry | null>(null);

export function HelmetProvider({ children }: { children: ReactNode }) {
  const [registry] = useState(() => new HeadRegistry());
  return <HeadContext.Provider value={registry}>{children}</HeadContext.Provider>;
}

export function Helmet({ children, priority = 10 }: { children?: ReactNode; priority?: number }) {
  const registry = useContext(HeadContext);
  const id = useId();
  useLayoutEffect(() => {
    if (!registry) return;
    registry.register(id, childrenToHead(children), priority);
    return () => registry.unregister(id);
  }, [children, id, priority, registry]);
  // React 19's native metadata rendering is useful on the server. In the browser,
  // one registry adopts the injected tags instead of adding a second set.
  return typeof document === 'undefined' ? <ServerHelmet>{children}</ServerHelmet> : null;
}

export function RouteHead() {
  const registry = useContext(HeadContext);
  const { pathname } = useLocation();
  useEffect(() => { void registry?.navigate(pathname); }, [pathname, registry]);
  return null;
}
