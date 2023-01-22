interface BasePage {
  next: string | null;
  limit: number;
}

interface SetupSettings {
  initialItems: number;
  path: string;
}

const SPOTIFY_API_URL = process.env.NEXT_PUBLIC_SPOTIFY_API_URL ?? '';

export const setup = ({ initialItems, path }: SetupSettings) => {
  const getSafeURL = (url: unknown) => {
    // pageParam is null for the first page
    if (typeof url !== 'string') {
      const urlObj = new URL(SPOTIFY_API_URL);
      urlObj.pathname += path;
      urlObj.searchParams.set('limit', initialItems.toString());
      urlObj.searchParams.set('time_range', 'long_term');

      return urlObj.toString();
    }

    return url;
  };

  const getOptimizedNextPageParam = ({
    next,
    limit: currPageLimit,
  }: BasePage) => {
    if (!next) {
      return undefined;
    }

    const url = new URL(next);

    // We prefetch the first <currPageLimit> items to make initial page load fast, after page load
    // we fetch the next <49 - currPageLimit> items in the background, and then we fetch the last 50 items
    // if the user scrolls over 70% of the visible items (see useInfiniteScroll component)
    if (currPageLimit === initialItems) {
      url.searchParams.set('limit', (49 - currPageLimit).toString());
    } else {
      url.searchParams.set('limit', '50');
    }

    return url.toString();
  };

  return { getSafeURL, getOptimizedNextPageParam };
};
