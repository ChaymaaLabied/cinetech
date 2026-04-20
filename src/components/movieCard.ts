import { getFavorites, saveFavorites } from "../utils/localStorage";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

export const createMovieCard = (movie: any) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-id", movie.id);

  const img = document.createElement("img");
  img.src = `${IMAGE_URL}${movie.poster_path}`;

  const title = document.createElement("h3");
  title.textContent = movie.title;

  const favBtn = document.createElement("button");
  favBtn.textContent = "⭐";
  favBtn.classList.add("fav-btn");

  favBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    let favorites = getFavorites();

    const exists = favorites.find((m: any) => m.id === movie.id);

    if (exists) {
      favorites = favorites.filter((m: any) => m.id !== movie.id);
      console.log("❌ retiré des favoris");
    } else {
      favorites.push(movie);
      console.log("⭐ ajouté aux favoris");
    }

    saveFavorites(favorites);
  });

  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(favBtn);

  return card;
};
