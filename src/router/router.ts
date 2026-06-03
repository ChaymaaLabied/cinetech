import { fetchPopularMovies } from "../api/movies";
import { fetchMovieById } from "../api/movieDetail";
import { fetchMovieCredits } from "../api/movieCredits";
import { fetchMovieReviews } from "../api/movieReviews";
import { fetchSimilarMovies } from "../api/similarMovies";

import { fetchPopularSeries } from "../api/series";
import { fetchSerieById } from "../api/serieDetail";
import { fetchSerieCredits } from "../api/serieCredits";
import { fetchSerieReviews } from "../api/serieReviews";
import { fetchSimilarSeries } from "../api/similarSeries";

import { renderHome } from "../pages/home";
import { renderMovies } from "../pages/movies";
import { renderDetail } from "../pages/details";
import { renderFavorites } from "../pages/favorites";
import { renderSeries } from "../pages/series";

export const createRouter = (app: HTMLElement) => {
  // Change l'URL et affiche la page correspondante
  const navigate = (path: string) => {
    history.pushState({}, "", path);
    router();
  };

  // Vérifie l'URL actuelle et affiche la bonne page
  const router = async () => {
    const path = window.location.pathname;

    // Page favoris
    if (path === "/favorites") {
      renderFavorites(app);
      return;
    }

    // Détail d'un film
    if (path.startsWith("/movie/")) {
      const id = path.split("/")[2];
      if (!id) return;

      const movie = await fetchMovieById(id);
      const credits = await fetchMovieCredits(id);
      const reviews = await fetchMovieReviews(id);
      const similar = await fetchSimilarMovies(id);

      renderDetail(
        movie,
        "movie",
        app,
        () => navigate("/movies"),
        credits,
        reviews,
        similar,
      );
      return;
    }

    // Détail d'une série
    if (path.startsWith("/tv/")) {
      const id = path.split("/")[2];
      if (!id) return;

      const serie = await fetchSerieById(id);
      const credits = await fetchSerieCredits(id);
      const reviews = await fetchSerieReviews(id);
      const similar = await fetchSimilarSeries(id);

      renderDetail(
        serie,
        "tv",
        app,
        () => navigate("/series"),
        credits,
        reviews,
        similar,
      );
      return;
    }

    // Liste des films
    if (path === "/movies") {
      await renderMovies(app);
      return;
    }

    // Liste des séries
    if (path === "/series") {
      await renderSeries(app);
      return;
    }

    // Page d'accueil
    const moviesData = await fetchPopularMovies();
    const seriesData = await fetchPopularSeries();

    renderHome(
      moviesData.results || moviesData,
      seriesData.results || seriesData,
      app,
    );
  };

  // Gère les boutons précédent / suivant du navigateur
  window.addEventListener("popstate", router);

  return { navigate, router };
};
