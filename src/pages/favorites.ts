import { getFavorites, saveFavorites } from "../utils/localStorage";
import { createMovieCard } from "../components/MovieCard";

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

  favorites.forEach((item: any) => {
    const type = item.title ? "movie" : "tv";

    const card = createMovieCard(item, type);

    const favBtn = card.querySelector(".fav-btn") as HTMLButtonElement;

    favBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      let updated = getFavorites().filter((f: any) => f.id !== item.id);

      saveFavorites(updated);

      renderFavorites(app); // refresh UI
    });

    container.appendChild(card);
  });

  app.appendChild(container);
};
