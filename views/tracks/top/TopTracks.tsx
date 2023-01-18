import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Grid } from '@components/Common';
import { InfiniteScroll } from '@components/InfiniteScroll';
import { useInfiniteTopTracks } from '@hooks/queries/useTopTracks';
import { TrackCard } from './TrackCard';

export const TopTracks: FC = () => {
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteTopTracks();
  const [pages, setPages] = useState<NonNullable<typeof data>['pages']>(
    data?.pages ?? [],
  );

  useEffect(() => {
    const safePages = data?.pages ?? [];

    if (safePages.length > 1) {
      const deepClonedPages = structuredClone(safePages);
      const basePage = deepClonedPages[1];
      const { items } = basePage;

      const deepClonedItem = structuredClone(items[0]);

      deepClonedItem.name = 'Pigstep';
      deepClonedItem.uri = 'https://youtu.be/dQw4w9WgXcQ';
      deepClonedItem.album.name = 'Pigstep';
      deepClonedItem.album.images[1] = {
        height: 471,
        width: 471,
        url: '/100.png',
      };

      basePage.items.push(deepClonedItem);

      setPages(deepClonedPages);
    }
  }, [data?.pages]);

  return (
    <InfiniteScroll fetchMore={fetchNextPage} disabled={isFetchingNextPage}>
      <Grid>
        {pages.map((page) =>
          page.items.map((track, itemIndex) => (
            <TrackCard
              key={track.uri}
              track={track}
              rank={page.offset + itemIndex + 1}
            />
          )),
        )}
      </Grid>
    </InfiniteScroll>
  );
};
