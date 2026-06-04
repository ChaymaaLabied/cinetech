export const createHeader = () => {
  const nav = document.createElement("nav");
  nav.className =
    "navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-secondary";

  const container = document.createElement("div");
  container.className = "container-fluid";

  // Logo cliquable (Cinetech)
  const brand = document.createElement("span");
  brand.className = "navbar-brand fw-bold text-warning fs-4";
  brand.textContent = "🎬 Cinetech";
  brand.id = "nav-brand";

  const navList = document.createElement("ul");
  navList.className = "navbar-nav ms-auto flex-row gap-2";

  const navItems: { id: string; label: string }[] = [
    { id: "nav-home", label: "Accueil" },
    { id: "nav-movies", label: "Films" },
    { id: "nav-series", label: "Séries" },
    { id: "nav-fav", label: "⭐ Favoris" },
  ];

  navItems.forEach(({ id, label }) => {
    const li = document.createElement("li");
    li.className = "nav-item";

    const btn = document.createElement("button");
    btn.className = "btn btn-link nav-link text-white px-2";
    btn.id = id;
    btn.textContent = label;

    li.appendChild(btn);
    navList.appendChild(li);
  });

  container.appendChild(brand);
  container.appendChild(navList);
  nav.appendChild(container);

  return nav;
};
