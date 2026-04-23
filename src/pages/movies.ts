import { fetchPopularMovies } from "../api/movies";
import { searchMovies } from "../api/searchMovies";
import { createMovieCard } from "../components/MovieCard";
import { debounce } from "../utils/debounce";

let currentPage = 1;
let currentQuery = "";

export const renderMovies = async (app: HTMLElement | null) => {
  if (!app) return;

  app.innerHTML = "";

  const searchInput = document.createElement("input");
  searchInput.placeholder = "Rechercher un film...";

  const container = document.createElement("div");
  container.classList.add("movies-container");

  const pagination = document.createElement("div");

  const renderData = async () => {
    let data;

    if (currentQuery) {
      data = await searchMovies(currentQuery, currentPage);
    } else {
      data = await fetchPopularMovies(currentPage);
    }

    container.innerHTML = "";

    data.results.forEach((movie: any) => {
      container.appendChild(createMovieCard(movie, "movie"));
    });
  };

  // 🔥 LIVE SEARCH (DEBOUNCE)
  searchInput.addEventListener(
    "input",
    debounce(async (e: any) => {
      currentQuery = e.target.value;
      currentPage = 1;
      await renderData();
    }, 400),
  );

  // 🔥 PAGINATION
  const prev = document.createElement("button");
  prev.textContent = "Prev";

  const next = document.createElement("button");
  next.textContent = "Next";

  prev.onclick = async () => {
    if (currentPage > 1) {
      currentPage--;
      await renderData();
    }
  };

  next.onclick = async () => {
    currentPage++;
    await renderData();
  };

  pagination.appendChild(prev);
  pagination.appendChild(next);

  await renderData();

  app.appendChild(searchInput);
  app.appendChild(container);
  app.appendChild(pagination);
};
