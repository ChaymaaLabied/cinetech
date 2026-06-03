import { createHeader } from "./components/Header";
import { createFooter } from "./components/Footer";
import { createRouter } from "./router/router";

const root = document.querySelector<HTMLDivElement>("#root");
if (!root) throw new Error("root not found");

root.innerHTML = "";

// Création de la structure principale
const header = createHeader();

const app = document.createElement("div");
app.id = "app";
app.className = "flex-grow-1";

const footer = createFooter();

root.appendChild(header);
root.appendChild(app);
root.appendChild(footer);

// Initialisation du routeur
const { navigate, router } = createRouter(app);

// Navigation du menu
const navHome = header.querySelector("#nav-home");
const navMovies = header.querySelector("#nav-movies");
const navFav = header.querySelector("#nav-fav");
const navSeries = header.querySelector("#nav-series");

navHome?.addEventListener("click", () => navigate("/"));
navMovies?.addEventListener("click", () => navigate("/movies"));
navFav?.addEventListener("click", () => navigate("/favorites"));
navSeries?.addEventListener("click", () => navigate("/series"));

// Gestion du clic sur une carte
app.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;

  // Ignore le bouton favoris
  if (target.classList.contains("fav-btn")) return;

  const card = target.closest(".card");
  if (!card) return;

  const id = card.getAttribute("data-id");
  const type = card.getAttribute("data-type");

  if (!id || !type) return;

  navigate(`/${type}/${id}`);
});

// Lancement de l'application
router();
