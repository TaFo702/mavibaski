declare module '*routeHeadFallback.json' {
  const fallback: {
    defaults: Record<string, string>;
    routes: Record<string, [title: string, description: string, canonical: string, overrides: Record<string, string>]>;
  };
  export default fallback;
}
