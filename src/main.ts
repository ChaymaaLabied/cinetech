import { createHeader } from "./components/Header";
import { createFooter } from "./components/Footer";
import { createRouter } from "./router/router";

const root = document.querySelector<HTMLDivElement>("#root");
if (!root) throw new Error("root not found");

root.innerHTML = "";

// 🟢 layout
const header = createHeader();
const app = document.createElement("div");
app.id = "app";
const footer = createFooter();

root.appendChild(header);
root.appendChild(app);
root.appendChild(footer);

// 🟢 router
const { navigate, router } = createRouter(app);

// 🟢 navigation header
const navHome = header.querySelector("#nav-home");
const navMovies = header.querySelector("#nav-movies");
const navFav = header.querySelector("#nav-fav");
const navSeries = header.querySelector("#nav-series");

navHome?.addEventListener("click", () => navigate("/"));
navMovies?.addEventListener("click", () => navigate("/movies"));
navFav?.addEventListener("click", () => navigate("/favorites"));
navSeries?.addEventListener("click", () => navigate("/series"));

// 🟢 click cards (détail)
app.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;

  // ❌ ignore fav button
  if (target.classList.contains("fav-btn")) return;

  const card = target.closest(".card");
  if (!card) return;

  const id = card.getAttribute("data-id");
  const type = card.getAttribute("data-type");

  if (!id || !type) return;

  navigate(`/${type}/${id}`);
});

// 🟢 start app
router();
