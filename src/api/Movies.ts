import { API_KEY, BASE_URL } from "./config";

export const fetchPopularMovies = async (page: number = 1) => {
  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`,
  );

  const data = await res.json();
  return data;
};
