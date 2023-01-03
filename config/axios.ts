import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SPOTIFY_API_URL ?? '';
