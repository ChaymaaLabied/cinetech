import { API_KEY, BASE_URL } from "./config";
import type { Movie } from "../models/Movie";

export const fetchMovieById = async (id: string): Promise<Movie> => {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);

  const data = await res.json();
  return data;
};
