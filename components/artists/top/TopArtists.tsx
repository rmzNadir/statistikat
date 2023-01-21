import type { FC } from 'react';
import { Grid } from '@components/Common';
import { InfiniteScroll } from '@components/InfiniteScroll';
import { Section } from '@components/section';
import { useInfiniteTopArtists } from '@hooks/queries/useTopArtists';
import { ArtistCard } from './ArtistCard';

export const TopArtists: FC = () => {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteTopArtists();

  const pages = data?.pages ?? [];

  return (
    <Section title="Top Artists" gridId="top-artists-grid">
      <InfiniteScroll
        fetchMore={fetchNextPage}
        disabled={!hasNextPage}
        loading={isFetchingNextPage}
        fetchMoreOnMount
        disableLoadingOnMountFetch
      >
        <Grid id="top-artists-grid">
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
