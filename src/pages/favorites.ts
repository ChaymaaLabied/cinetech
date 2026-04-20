import { getFavorites } from "../utils/localStorage";
import { createMovieCard } from "../components/movieCard";

export const renderFavorites = (app: HTMLElement | null) => {
  if (!app) return;

  app.innerHTML = "";

  const favorites = getFavorites();

  const container = document.createElement("div");
  container.classList.add("movies-container");

  if (favorites.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "Aucun favori ⭐";
    app.appendChild(empty);
    return;
  }

  favorites.forEach((movie: any) => {
    const card = createMovieCard(movie);
    const favBtn = card.querySelector<HTMLButtonElement>(".fav-btn");

    favBtn?.addEventListener("click", () => {
      // 🔥 désactiver bouton après click
      if (favBtn) {
        favBtn.disabled = true;
        favBtn.style.opacity = "0.5";
      }
    });

    container.appendChild(card);
  });

  app.appendChild(container);
};
