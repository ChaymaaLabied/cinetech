import { createMovieCard } from "../components/movieCard";

export const renderHome = (movies: any[], app: HTMLElement | null) => {
  if (!app) return;

  app.innerHTML = "";

  const container = document.createElement("div");
  container.classList.add("movies-container");

  movies.forEach((movie) => {
    const card = createMovieCard(movie);
    container.appendChild(card);
  });

  app.appendChild(container);
};
