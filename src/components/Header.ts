export const createHeader = () => {
  const header = document.createElement("header");

  const homeBtn = document.createElement("button");
  homeBtn.textContent = "Home";
  homeBtn.id = "nav-home";

  const moviesBtn = document.createElement("button");
  moviesBtn.textContent = "Films";
  moviesBtn.id = "nav-movies";

  const seriesBtn = document.createElement("button");
  seriesBtn.textContent = "Séries";
  seriesBtn.id = "nav-series";

  const favBtn = document.createElement("button");
  favBtn.textContent = "Favoris ⭐";
  favBtn.id = "nav-fav";

  header.appendChild(homeBtn);
  header.appendChild(moviesBtn);
  header.appendChild(seriesBtn);
  header.appendChild(favBtn);

  return header;
};
