import axios from 'axios';
import type { Session } from 'next-auth';
import { createQueryHook } from '@utils/createQueryHook';
import type { Artist } from 'types/spotify';

interface TopArtistsReponse {
  items: Required<Artist>[];
}

export const getTopArtists = async (session: Session) => {
  const { data } = await axios.get<TopArtistsReponse>(
    '/top/artists?limit=25&time_range=long_term',
    {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    },
  );

  return data.items;
};

export const useTopArtists = createQueryHook('topArtists', getTopArtists);
