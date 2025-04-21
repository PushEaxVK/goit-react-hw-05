// Api
import axios from 'axios';
import {
  createAbortController,
  cancelRequest,
  handleAxiosError,
} from './requestManager';

const API_READ_ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OWFkYTkyNWQ5ZDZkNDQ1YTEwNzBmNWVlMjhiOGM1OSIsIm5iZiI6MTc0NTE2NDI0MS4xMDQsInN1YiI6IjY4MDUxN2QxYWMwMmQ0NDA3YmFhOTJiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KpNPuQIlmjC3mY9DVlsu7n3NhLxQSX7iViFaLW3dfZk';
const API_KEY = '89ada925d9d6d445a1070f5ee28b8c59';

const URLS = {
  CONFIG: 'https://api.themoviedb.org/3/configuration',
  TRANDING: 'https://api.themoviedb.org/3/trending/movie/',
  DETAILS: 'https://api.themoviedb.org/3/movie/',
};

const options = {
  headers: {
    Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
  },
};

// Config
export async function getConfig() {
  const signal = createAbortController('getConfig');

  try {
    const response = await axios.get(URLS.CONFIG, {
      ...options,
      signal,
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

export function cancelConfigRequest() {
  cancelRequest('getConfig');
}

// Trending
export async function getTrending(time_window = 'day', language = 'en-US') {
  const signal = createAbortController('getTrending');

  try {
    const response = await axios.get(
      `${URLS.TRANDING}${time_window}?language=${language}`,
      { ...options, signal }
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

export function cancelTrendingRequest() {
  cancelRequest('getTrending');
}

// Details
export async function getDetails(movieId, language = 'en-US') {
  const signal = createAbortController('getDetails');

  try {
    const response = await axios.get(
      `${URLS.DETAILS}${movieId}?language=${language}`,
      { ...options, signal }
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}

export function cancelDetailsRequest() {
  cancelRequest('getDetails');
}
