import { getFavorites, saveFavorites } from "../utils/localStorage";
import { createMovieCard } from "../components/movieCard";

export const renderFavorites = (app: HTMLElement | null) => {
  if (!app) return;

  app.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className = "container-fluid py-4";

  const pageTitle = document.createElement("h2");
  pageTitle.className = "mb-4";
  pageTitle.textContent = "⭐ Mes Favoris";

  wrapper.appendChild(pageTitle);

  const favorites = getFavorites();

  if (favorites.length === 0) {
    const empty = document.createElement("p");
    empty.className = "text-secondary";
    empty.textContent = "Aucun favori pour le moment.";
    wrapper.appendChild(empty);
    app.appendChild(wrapper);
    return;
  }

  const container = document.createElement("div");
  container.className =
    "row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3";

  favorites.forEach((item: any) => {
    const type = item.title ? "movie" : "tv";
    const col = createMovieCard(item, type);

    const favBtn = col.querySelector(".fav-btn") as HTMLButtonElement;
    favBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const updated = getFavorites().filter((f: any) => f.id !== item.id);
      saveFavorites(updated);
      renderFavorites(app);
    });

    container.appendChild(col);
  });

  wrapper.appendChild(container);
  app.appendChild(wrapper);
};
