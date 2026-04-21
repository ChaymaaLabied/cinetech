import { createMovieCard } from "../components/movieCard";

export const renderSeries = (series: any[], app: HTMLElement | null) => {
  if (!app) return;

  app.innerHTML = "";

  const container = document.createElement("div");
  container.classList.add("movies-container");

  series.forEach((item) => {
    const card = createMovieCard(item);
    container.appendChild(card);
  });

  app.appendChild(container);
};
