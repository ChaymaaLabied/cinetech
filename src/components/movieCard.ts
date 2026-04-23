import { getFavorites, saveFavorites } from "../utils/localStorage";

export const createMovieCard = (item: any, type: "movie" | "tv") => {
  const card = document.createElement("div");
  card.classList.add("card");

  card.setAttribute("data-id", item.id);
  card.setAttribute("data-type", type);

  const img = document.createElement("img");
  img.src = `https://image.tmdb.org/t/p/w500${item.poster_path}`;

  const title = document.createElement("h3");
  title.textContent = item.title || item.name;

  const favBtn = document.createElement("button");
  favBtn.textContent = "⭐";
  favBtn.classList.add("fav-btn");

  // ⭐ FAVORITES LOGIC (IMPORTANT)
  favBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    let favorites = getFavorites();

    const exists = favorites.find((m: any) => m.id === item.id);

    if (exists) {
      favorites = favorites.filter((m: any) => m.id !== item.id);
      console.log("❌ retiré des favoris");
    } else {
      favorites.push({ ...item, type });
      console.log("⭐ ajouté aux favoris");
    }

    saveFavorites(favorites);
  });

  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(favBtn);

  return card;
};
