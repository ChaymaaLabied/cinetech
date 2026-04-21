import { getFavorites, saveFavorites } from "../utils/localStorage";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

export const createMovieCard = (item: any) => {
  const card = document.createElement("div");
  card.classList.add("card");

  // 🔥 ID + TYPE (IMPORTANT POUR ROUTING)
  card.setAttribute("data-id", item.id);
  card.setAttribute("data-type", item.title ? "movie" : "tv");

  const img = document.createElement("img");
  img.src = `${IMAGE_URL}${item.poster_path}`;

  const title = document.createElement("h3");

  // 🔥 film = title / série = name
  title.textContent = item.title || item.name;

  const favBtn = document.createElement("button");
  favBtn.textContent = "⭐";
  favBtn.classList.add("fav-btn");

  favBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    let favorites = getFavorites();

    const exists = favorites.find((m: any) => m.id === item.id);

    if (exists) {
      favorites = favorites.filter((m: any) => m.id !== item.id);
      console.log("❌ retiré des favoris");
    } else {
      favorites.push(item);
      console.log("⭐ ajouté aux favoris");
    }

    saveFavorites(favorites);
  });

  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(favBtn);

  return card;
};
