import { fetchPopularMovies } from "./api/Movies";
import { fetchMovieById } from "./api/movieDetail";
import { renderHome } from "./pages/home";
import { renderDetail } from "./pages/details";
import { renderFavorites } from "./pages/favorites";
import { createHeader } from "./components/Header";
import { createFooter } from "./components/Footer";

const root = document.querySelector("#root");

let app: HTMLDivElement | null = null;

/*  INIT DOM D'ABORD */
if (root) {
  root.innerHTML = "";

  const header = createHeader();

  app = document.createElement("div");
  app.id = "app";

  const footer = createFooter();

  root.appendChild(header);
  root.appendChild(app);
  root.appendChild(footer);
}

/*  LOGIQUE */
const goHome = async () => {
  if (!app) return;
  const movies = await fetchPopularMovies();
  renderHome(movies, app);
};

const handleCardClick = async (e: Event) => {
  const target = e.target as HTMLElement;
  const card = target.closest(".card");

  if (!card) return;

  const id = card.getAttribute("data-id");
  if (!id || !app) return;

  const movie = await fetchMovieById(id);

  renderDetail(movie, app, goHome);
};

/*  EVENTS */
app?.addEventListener("click", handleCardClick);

/*  NAVIGATION */
const navHome = document.querySelector("#nav-home");
const navFav = document.querySelector("#nav-fav");

navHome?.addEventListener("click", () => goHome());

navFav?.addEventListener("click", () => {
  if (!app) return;
  renderFavorites(app);
});

/* START */
goHome();
