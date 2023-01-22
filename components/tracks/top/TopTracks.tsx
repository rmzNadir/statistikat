import type { FC } from 'react';
import { Grid } from '@components/Common';
import { InfiniteScroll } from '@components/InfiniteScroll';
import { Section } from '@components/section';
import {
  PREFETCHED_ITEM_COUNT,
  useInfiniteTopTracks,
} from '@hooks/queries/useTopTracks';
import { TrackCard } from './TrackCard';

const GRID_ID = 'top-tracks-grid';

export const TopTracks: FC = () => {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteTopTracks();

  const pages = data?.pages ?? [];

  return (
    <Section
      mainItemCount={PREFETCHED_ITEM_COUNT}
      title="Top Tracks"
      gridId={GRID_ID}
    >
      <InfiniteScroll
        fetchMore={fetchNextPage}
        disabled={!hasNextPage}
        loading={isFetchingNextPage}
        fetchMoreOnMount
        disableLoadingOnMountFetch
      >
        <Grid id={GRID_ID}>
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
    </Section>
  );
};
