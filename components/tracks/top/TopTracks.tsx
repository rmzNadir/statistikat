import type { FC } from 'react';
import { Grid } from '@components/Common';
import { InfiniteScroll } from '@components/InfiniteScroll';
import { Section } from '@components/section';
import { useInfiniteTopTracks } from '@hooks/queries/useTopTracks';
import { TrackCard } from './TrackCard';

export const TopTracks: FC = () => {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteTopTracks();

  const pages = data?.pages ?? [];

  return (
    <Section title="Top Tracks" gridId="top-tracks-grid">
      <InfiniteScroll
        fetchMore={fetchNextPage}
        disabled={!hasNextPage}
        loading={isFetchingNextPage}
        fetchMoreOnMount
        disableLoadingOnMountFetch
      >
        <Grid id="top-tracks-grid">
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
