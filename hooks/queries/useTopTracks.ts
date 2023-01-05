import axios from 'axios';
import type { Session } from 'next-auth';
import { createQueryHook } from '@utils/createQueryHook';
import type { Track } from 'types/spotify';

interface TopTracksReponse {
  items: Track[];
}

export const getTopTracks = async (session: Session) => {
  const { data } = await axios.get<TopTracksReponse>(
    '/top/tracks?limit=25&time_range=long_term',
    {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    },
  );

  return data.items;
};

export const useTopTracks = createQueryHook('topTracks', getTopTracks);
