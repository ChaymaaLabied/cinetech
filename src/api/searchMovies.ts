import { API_KEY, BASE_URL } from "./config";

export const searchMovies = async (query: string, page = 1) => {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query,
    )}&page=${page}`,
  );

  return res.json();
};
