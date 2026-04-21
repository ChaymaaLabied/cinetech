import { API_KEY, BASE_URL } from "./config";

export const fetchMovieCredits = async (id: string) => {
  const res = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);

  return res.json();
};
