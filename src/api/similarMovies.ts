import { API_KEY, BASE_URL } from "./config";

export const fetchSimilarMovies = async (id: string) => {
  const res = await fetch(
    `${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&language=fr-FR`,
  );
  return res.json();
};
