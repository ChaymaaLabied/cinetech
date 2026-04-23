import { API_KEY, BASE_URL } from "./config";

export const fetchMovieReviews = async (id: string) => {
  const res = await fetch(`${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}`);
  return res.json();
};
