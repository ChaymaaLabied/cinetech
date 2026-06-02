import { API_KEY, BASE_URL } from "./config";

export const fetchSimilarSeries = async (id: string) => {
  const res = await fetch(
    `${BASE_URL}/tv/${id}/similar?api_key=${API_KEY}&language=fr-FR`,
  );
  return res.json();
};
