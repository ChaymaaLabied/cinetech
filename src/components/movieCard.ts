import { getFavorites, saveFavorites } from "../utils/localStorage";

export const createMovieCard = (item: any, type: "movie" | "tv") => {
  // Outer col wrapper for Bootstrap grid
  const col = document.createElement("div");
  col.className = "col";

  const card = document.createElement("div");
  card.className = "card h-100 movie-card border-0 text-white";
  card.setAttribute("data-id", item.id);
  card.setAttribute("data-type", type);

  const img = document.createElement("img");
  img.className = "card-img-top";
  img.src = item.poster_path
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : "https://placehold.co/500x750?text=No+Image";
  img.alt = item.title || item.name;

  const cardBody = document.createElement("div");
  cardBody.className = "card-body d-flex flex-column p-2";

  const title = document.createElement("h6");
  title.className = "card-title flex-grow-1 mb-2";
  title.textContent = item.title || item.name;

  const favBtn = document.createElement("button");
  favBtn.className = "btn btn-sm btn-outline-warning fav-btn mt-auto";
  favBtn.textContent = "⭐ Favori";

  // Favorites logic
  favBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    let favorites = getFavorites();
    const exists = favorites.find((m: any) => m.id === item.id);
    if (exists) {
      favorites = favorites.filter((m: any) => m.id !== item.id);
      favBtn.textContent = "⭐ Favori";
      favBtn.classList.replace("btn-warning", "btn-outline-warning");
    } else {
      favorites.push({ ...item, type });
      favBtn.textContent = "★ Ajouté";
      favBtn.classList.replace("btn-outline-warning", "btn-warning");
    }
    saveFavorites(favorites);
  });

  cardBody.appendChild(title);
  cardBody.appendChild(favBtn);
  card.appendChild(img);
  card.appendChild(cardBody);
  col.appendChild(card);

  return col;
};
