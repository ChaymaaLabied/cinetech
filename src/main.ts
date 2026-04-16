import { fetchPopularMovies } from "./api/Movies";
import { fetchMovieById } from "./api/movieDetail";

const app = document.querySelector<HTMLDivElement>("#app");

const getFavorites = () => {
  return JSON.parse(localStorage.getItem("favorites") || "[]");
};

const saveFavorites = (favorites: any[]) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const renderMovies = (movies: any[]) => {
  if (!app) return;

  app.innerHTML = "";

  const container = document.createElement("div");
  container.classList.add("movies-container");

  movies.forEach((movie) => {
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
    container.appendChild(card);
  });

  app.appendChild(container);
};

const renderMovieDetail = (movie: any) => {
  if (!app) return;

  app.innerHTML = "";

  const container = document.createElement("div");

  const title = document.createElement("h1");
  title.textContent = movie.title;

  const img = document.createElement("img");
  img.src = `${IMAGE_URL}${movie.poster_path}`;

  const overview = document.createElement("p");
  overview.textContent = movie.overview;

  const date = document.createElement("p");
  date.textContent = movie.release_date;

  const backBtn = document.createElement("button");
  backBtn.textContent = "Retour";

  backBtn.addEventListener("click", () => init());

  container.appendChild(title);
  container.appendChild(img);
  container.appendChild(overview);
  container.appendChild(date);
  container.appendChild(backBtn);

  app.appendChild(container);
};

const init = async () => {
  const movies = await fetchPopularMovies();

  renderMovies(movies);

  // EVENT DELEGATION (1 seul listener propre)
  app?.addEventListener("click", async (e) => {
    const target = e.target as HTMLElement;
    const card = target.closest(".card");

    if (!card) return;

    const id = card.getAttribute("data-id");
    if (!id) return;

    const movie = await fetchMovieById(id);

    renderMovieDetail(movie);
  });
};

init();
