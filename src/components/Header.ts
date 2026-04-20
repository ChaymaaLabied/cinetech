export const createHeader = () => {
  const header = document.createElement("header");

  const homeBtn = document.createElement("button");
  homeBtn.textContent = "Home";
  homeBtn.id = "nav-home";

  const favBtn = document.createElement("button");
  favBtn.textContent = "Favoris ⭐";
  favBtn.id = "nav-fav";

  header.appendChild(homeBtn);
  header.appendChild(favBtn);

  return header;
};
