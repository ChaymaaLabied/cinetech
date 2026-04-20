const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

export const renderDetail = (
  movie: any,
  app: HTMLElement | null,
  goHome: () => void,
) => {
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

  backBtn.addEventListener("click", goHome);

  container.appendChild(title);
  container.appendChild(img);
  container.appendChild(overview);
  container.appendChild(date);
  container.appendChild(backBtn);

  app.appendChild(container);
};
