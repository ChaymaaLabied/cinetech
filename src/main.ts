import { fetchPopularMovies } from "./api/Movies";
import { fetchMovieById } from "./api/movieDetail";
import { renderHome } from "./pages/home";
import { renderDetail } from "./pages/details";

const app = document.querySelector<HTMLDivElement>("#app");

const goHome = async () => {
  const movies = await fetchPopularMovies();
  renderHome(movies, app);
};

const handleCardClick = async (e: Event) => {
  const target = e.target as HTMLElement;
  const card = target.closest(".card");

  if (!card) return;

  const id = card.getAttribute("data-id");
  if (!id) return;

  const movie = await fetchMovieById(id);

  renderDetail(movie, app, goHome);
};

app?.addEventListener("click", handleCardClick);

goHome();
