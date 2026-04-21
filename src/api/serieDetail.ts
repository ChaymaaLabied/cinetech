import { API_KEY, BASE_URL } from "./config";

export const fetchSerieById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`);

  return await res.json();
};
