import axios from 'axios';
import type { Session } from 'next-auth';
import { createQueryHook } from '@utils/createQueryHook';
import type { TopArtistsReponse } from 'types/spotify';

export const PREFETCHED_ITEM_COUNT = 12;

const SPOTIFY_API_URL = process.env.NEXT_PUBLIC_SPOTIFY_API_URL ?? '';

export const getTopGenres = async (session: Session) => {
  const [first49, last50] = await Promise.all([
    await axios.get<TopArtistsReponse>(
      `${SPOTIFY_API_URL}/top/artists?limit=49&time_range=long_term`,
      {
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
      },
    ),
    await axios.get<TopArtistsReponse>(
      `${SPOTIFY_API_URL}/top/artists?limit=50&offset=49&time_range=long_term`,
      {
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
      },
    ),
  ]);

  const genreMap = new Map<string, number>();

  first49.data.items.forEach((artist) => {
    artist.genres.forEach((genre) => {
      genreMap.set(genre, (genreMap.get(genre) ?? 0) + 1);
    });
  });

  last50.data.items.forEach((artist) => {
    artist.genres.forEach((genre) => {
      genreMap.set(genre, (genreMap.get(genre) ?? 0) + 1);
    });
  });

  const topGenres = Array.from(genreMap.entries(), ([name, value]) => ({
    name,
    value,
  }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 99);

  return topGenres;
};

export const useGetTopGenres = createQueryHook({
  queryKey: ['topGenres'],
  queryFn: getTopGenres,
});
