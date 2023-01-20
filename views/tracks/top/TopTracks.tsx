import type { FC } from 'react';
import { Grid } from '@components/Common';
import { InfiniteScroll } from '@components/InfiniteScroll';
import { useInfiniteTopTracks } from '@hooks/queries/useTopTracks';
import { TrackCard } from './TrackCard';

export const TopTracks: FC = () => {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteTopTracks();

  const pages = data?.pages ?? [];

  return (
    <InfiniteScroll
      fetchMore={fetchNextPage}
      disabled={isFetchingNextPage || !hasNextPage}
    >
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
