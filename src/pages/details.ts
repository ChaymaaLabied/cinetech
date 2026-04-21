// const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

export const renderDetail = (
  item: any,
  type: "movie" | "tv",
  app: HTMLElement | null,
  goBack: () => void,
  credits?: any,
) => {
  if (!app) return;

  app.innerHTML = "";

  const container = document.createElement("div");

  const title = document.createElement("h1");
  title.textContent = item.title || item.name;

  const img = document.createElement("img");
  img.src = `https://image.tmdb.org/t/p/w500${item.poster_path}`;

  const overview = document.createElement("p");
  overview.textContent = item.overview;

  const rating = document.createElement("p");
  rating.textContent = `⭐ ${item.vote_average}`;

  const genres = document.createElement("p");
  genres.textContent =
    "Genres : " + (item.genres?.map((g: any) => g.name).join(", ") || "N/A");

  const date = document.createElement("p");
  date.textContent = item.release_date || item.first_air_date;

  const country = document.createElement("p");
  country.textContent = "Pays : " + (item.origin_country?.join(", ") || "N/A");

  container.appendChild(title);
  container.appendChild(img);
  container.appendChild(overview);
  container.appendChild(rating);
  container.appendChild(genres);
  container.appendChild(date);
  container.appendChild(country);

  // 🎭 ACTEURS
  if (credits?.cast) {
    const actors = document.createElement("p");
    actors.textContent =
      "Acteurs : " +
      credits.cast
        .slice(0, 5)
        .map((a: any) => a.name)
        .join(", ");

    container.appendChild(actors);
  }

  // 🎬 RÉALISATEUR (films)
  if (type === "movie" && credits?.crew) {
    const director = credits.crew.find((c: any) => c.job === "Director");

    const directorEl = document.createElement("p");
    directorEl.textContent = `Réalisateur : ${director?.name || "N/A"}`;

    container.appendChild(directorEl);
  }

  const back = document.createElement("button");
  back.textContent = "Retour";
  back.onclick = goBack;

  container.appendChild(back);

  app.appendChild(container);
};
