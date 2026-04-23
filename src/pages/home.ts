import { createMovieCard } from "../components/MovieCard";

export const renderHome = (
  movies: any[],
  series: any[],
  app: HTMLElement | null,
) => {
  if (!app) return;

  app.innerHTML = "";

  // 🔥 FILMS
  const moviesTitle = document.createElement("h2");
  moviesTitle.textContent = "Films";

  const moviesContainer = document.createElement("div");
  moviesContainer.classList.add("movies-container");

  movies.slice(0, 6).forEach((movie) => {
    const card = createMovieCard(movie, "movie"); // ✔ FIX
    moviesContainer.appendChild(card);
  });

  // 🔥 SERIES
  const seriesTitle = document.createElement("h2");
  seriesTitle.textContent = "Séries";

  const seriesContainer = document.createElement("div");
  seriesContainer.classList.add("movies-container");

  series.slice(0, 6).forEach((item) => {
    const card = createMovieCard(item, "tv"); // ✔ FIX
    seriesContainer.appendChild(card);
  });

  app.appendChild(moviesTitle);
  app.appendChild(moviesContainer);
  app.appendChild(seriesTitle);
  app.appendChild(seriesContainer);
};
