import { fetchPopularMovies } from "../api/movies";
import { fetchMovieById } from "../api/movieDetail";
import { fetchMovieCredits } from "../api/movieCredits";
import { fetchMovieReviews } from "../api/movieReviews";

import { fetchPopularSeries } from "../api/series";
import { fetchSerieById } from "../api/serieDetail";
import { fetchSerieCredits } from "../api/serieCredits";
import { fetchSerieReviews } from "../api/serieReviews";

import { renderHome } from "../pages/home";
import { renderMovies } from "../pages/movies";
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
      const reviews = await fetchMovieReviews(id); // 🔥 AJOUT

      renderDetail(
        movie,
        "movie",
        app,
        () => navigate("/movies"),
        credits,
        reviews, // 🔥 AJOUT
      );
      return;
    }

    // 📺 DETAIL SÉRIE
    if (path.startsWith("/tv/")) {
      const id = path.split("/")[2];
      if (!id) return;

      const serie = await fetchSerieById(id);
      const credits = await fetchSerieCredits(id);
      const reviews = await fetchSerieReviews(id); // 🔥 AJOUT

      renderDetail(
        serie,
        "tv",
        app,
        () => navigate("/series"),
        credits,
        reviews, // 🔥 AJOUT
      );
      return;
    }

    // 🎬 LISTE FILMS
    if (path === "/movies") {
      await renderMovies(app);
      return;
    }

    // 📺 LISTE SÉRIES
    if (path === "/series") {
      await renderSeries(app);
      return;
    }

    // 🏠 HOME
    const moviesData = await fetchPopularMovies();
    const seriesData = await fetchPopularSeries();

    renderHome(
      moviesData.results || moviesData,
      seriesData.results || seriesData,
      app,
    );
  };

  window.addEventListener("popstate", router);

  return { navigate, router };
};
