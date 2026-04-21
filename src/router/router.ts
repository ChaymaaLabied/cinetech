import { fetchPopularMovies } from "../api/Movies";
import { fetchMovieById } from "../api/movieDetail";
import { fetchMovieCredits } from "../api/movieCredits";

import { fetchPopularSeries } from "../api/series";
import { fetchSerieById } from "../api/serieDetail";
import { fetchSerieCredits } from "../api/serieCredits";

import { renderHome } from "../pages/home";
import { renderDetail } from "../pages/details";
import { renderFavorites } from "../pages/favorites";
import { renderSeries } from "../pages/series";

export const createRouter = (app: HTMLElement) => {
  const navigate = (path: string) => {
    history.pushState({}, "", path);
    router();
  };

  const router = async () => {
    const path = window.location.pathname;

    // ⭐ FAVORIS
    if (path === "/favorites") {
      renderFavorites(app);
      return;
    }

    // 🎬 DETAIL FILM
    if (path.startsWith("/movie/")) {
      const id = path.split("/")[2];
      if (!id) return;

      const movie = await fetchMovieById(id);
      const credits = await fetchMovieCredits(id);

      renderDetail(movie, "movie", app, () => navigate("/"), credits);
      return;
    }

    // 📺 DETAIL SÉRIE
    if (path.startsWith("/tv/")) {
      const id = path.split("/")[2];
      if (!id) return;

      const serie = await fetchSerieById(id);
      const credits = await fetchSerieCredits(id);

      renderDetail(serie, "tv", app, () => navigate("/series"), credits);
      return;
    }

    // 📺 LISTE SÉRIES
    if (path === "/series") {
      const series = await fetchPopularSeries();
      renderSeries(series, app);
      return;
    }

    // 🏠 HOME
    const movies = await fetchPopularMovies();
    const series = await fetchPopularSeries();

    renderHome(movies, series, app);
  };

  window.addEventListener("popstate", router);

  return { navigate, router };
};
