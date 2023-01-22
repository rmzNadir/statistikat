import type { FC } from 'react';
import { Grid } from '@components/Common';
import { InfiniteScroll } from '@components/InfiniteScroll';
import { Section } from '@components/section';
import {
  PREFETCHED_ITEM_COUNT,
  useInfiniteTopArtists,
} from '@hooks/queries/useTopArtists';
import { ArtistCard } from './ArtistCard';

const GRID_ID = 'top-artists-grid';

export const TopArtists: FC = () => {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteTopArtists();

  const pages = data?.pages ?? [];

  return (
    <Section
      mainItemCount={PREFETCHED_ITEM_COUNT}
      title="Top Artists"
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
            page.items.map((artist, itemIndex) => (
              <ArtistCard
                key={artist.uri}
                artist={artist}
                rank={page.offset + itemIndex + 1}
              />
            )),
          )}
        </Grid>
      </InfiniteScroll>
    </Section>
  );
};
