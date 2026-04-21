import { fetchPopularMovies } from "../api/Movies";
import { fetchMovieById } from "../api/movieDetail";
import { renderHome } from "../pages/home";
import { renderDetail } from "../pages/details";
import { renderFavorites } from "../pages/favorites";
import { fetchPopularSeries } from "../api/series";
import { renderSeries } from "../pages/series";
import { fetchSerieById } from "../api/serieDetail";

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
      renderDetail(movie, app, () => navigate("/"));
      return;
    }

    // 📺 DETAIL SÉRIE (🔥 AJOUT IMPORTANT)
    if (path.startsWith("/tv/")) {
      const id = path.split("/")[2];
      if (!id) return;

      const serie = await fetchSerieById(id);
      renderDetail(serie, app, () => navigate("/series"));
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
