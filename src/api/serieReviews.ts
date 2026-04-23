import { API_KEY, BASE_URL } from "./config";

export const fetchSerieReviews = async (id: string) => {
  const res = await fetch(`${BASE_URL}/tv/${id}/reviews?api_key=${API_KEY}`);
  return res.json();
};
