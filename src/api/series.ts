import { API_KEY, BASE_URL } from "./config";

export const fetchPopularSeries = async () => {
  const res = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}`);

  const data = await res.json();
  return data.results;
};
