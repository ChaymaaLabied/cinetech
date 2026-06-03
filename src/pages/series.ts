import { fetchPopularSeries } from "../api/series";
import { searchSeries } from "../api/searchSeries";
import { createMovieCard } from "../components/movieCard";
import { debounce } from "../utils/debounce";

let currentPage = 1;
let currentQuery = "";

export const renderSeries = async (app: HTMLElement | null) => {
  if (!app) return;

  app.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className = "container-fluid py-4";

  const pageTitle = document.createElement("h2");
  pageTitle.className = "mb-3";
  pageTitle.textContent = "📺 Séries populaires";

  const searchInput = document.createElement("input");
  searchInput.className =
    "form-control bg-dark text-white border-secondary mb-4";
  searchInput.placeholder = "Rechercher une série...";

  const container = document.createElement("div");
  container.className =
    "row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3";

  const pageInfo = document.createElement("span");
  pageInfo.className = "text-secondary";

  const pagination = document.createElement("div");
  pagination.className =
    "d-flex justify-content-center align-items-center gap-3 mt-4";

  const renderData = async () => {
    let data;
    if (currentQuery) {
      data = await searchSeries(currentQuery, currentPage);
    } else {
      data = await fetchPopularSeries(currentPage);
    }
    container.innerHTML = "";
    data.results.forEach((item: any) => {
      container.appendChild(createMovieCard(item, "tv"));
    });
    pageInfo.textContent = `Page ${currentPage}`;
  };

  //  LIVE SEARCH
  searchInput.addEventListener(
    "input",
    debounce(async (e: any) => {
      currentQuery = e.target.value;
      currentPage = 1;
      await renderData();
    }, 400),
  );

  //  PAGINATION
  const prev = document.createElement("button");
  prev.className = "btn btn-outline-light";
  prev.textContent = "← Précédent";

  const next = document.createElement("button");
  next.className = "btn btn-outline-light";
  next.textContent = "Suivant →";

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
  pagination.appendChild(pageInfo);
  pagination.appendChild(next);

  await renderData();

  wrapper.appendChild(pageTitle);
  wrapper.appendChild(searchInput);
  wrapper.appendChild(container);
  wrapper.appendChild(pagination);
  app.appendChild(wrapper);
};
