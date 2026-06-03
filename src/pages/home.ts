import { createMovieCard } from "../components/movieCard";

export const renderHome = (
  movies: any[],
  series: any[],
  app: HTMLElement | null,
) => {
  if (!app) return;

  app.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className = "container-fluid py-4";

  // FILMS
  const moviesTitle = document.createElement("h2");
  moviesTitle.className = "mb-3";
  moviesTitle.textContent = "🎥 Films populaires";

  const moviesContainer = document.createElement("div");
  moviesContainer.className =
    "row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3 mb-5";

  movies.slice(0, 10).forEach((movie) => {
    moviesContainer.appendChild(createMovieCard(movie, "movie"));
  });

  // SERIES
  const seriesTitle = document.createElement("h2");
  seriesTitle.className = "mb-3";
  seriesTitle.textContent = "📺 Séries populaires";

  const seriesContainer = document.createElement("div");
  seriesContainer.className =
    "row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3";

  series.slice(0, 10).forEach((item) => {
    seriesContainer.appendChild(createMovieCard(item, "tv"));
  });

  wrapper.appendChild(moviesTitle);
  wrapper.appendChild(moviesContainer);
  wrapper.appendChild(seriesTitle);
  wrapper.appendChild(seriesContainer);

  app.appendChild(wrapper);
};
