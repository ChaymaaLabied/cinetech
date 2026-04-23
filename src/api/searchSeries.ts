import { API_KEY, BASE_URL } from "./config";

export const searchSeries = async (query: string, page = 1) => {
  const res = await fetch(
    `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(
      query,
    )}&page=${page}`,
  );

  return res.json();
};
