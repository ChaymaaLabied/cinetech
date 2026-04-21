import { API_KEY, BASE_URL } from "./config";

export const fetchSerieCredits = async (id: string) => {
  const res = await fetch(`${BASE_URL}/tv/${id}/credits?api_key=${API_KEY}`);
  return res.json();
};
