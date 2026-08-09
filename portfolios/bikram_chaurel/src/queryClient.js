import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 24, // Data is fresh for a long time, we rely on background refetch or manual invalidation
      // Wait, stale-while-revalidate is achieved if staleTime is 0 (default) or small, but cache is kept.
      // The user requested: "On subsequent refreshes or revisits, instantly display the cached data while silently fetching fresh data in the background (stale-while-revalidate)."
      // React query default behavior: staleTime is 0, so it always refetches in background. The cached data is shown instantly if cacheTime > 0.
      // So let's set staleTime to 0 (which is default, but let's be explicit or just 5 minutes if we want to reduce reads slightly).
      // Let's set staleTime to a reasonable value like 5 minutes so it doesn't refetch on every single mount if moving around fast, 
      // but actually user said "On subsequent refreshes or revisits... silently fetching fresh data in background".
      // React Query default is exactly this: staleTime: 0, gcTime (cacheTime): 5 minutes.
      // Let's use staleTime: 1000 * 60 * 5 (5 minutes) to minimize reads, and gcTime: 1000 * 60 * 60 * 24 (24 hours).
      staleTime: 0, // Always refetch in background (stale-while-revalidate)
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      refetchOnWindowFocus: true,
    },
  },
});
