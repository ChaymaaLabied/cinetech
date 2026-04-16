import { API_KEY, BASE_URL } from "./config";
import type { Movie } from "../models/Movie";

interface ApiResponse {
  results: Movie[];
}

export const fetchPopularMovies = async (): Promise<Movie[]> => {
  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}`
  );

  const data: ApiResponse = await res.json();
  return data.results;
};