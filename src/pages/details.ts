import { getComments, addComment } from "../utils/localComments";

export const renderDetail = (
  item: any,
  type: "movie" | "tv",
  app: HTMLElement | null,
  goBack: () => void,
  credits?: any,
  reviews?: any,
) => {
  if (!app) return;

  app.innerHTML = "";

  const container = document.createElement("div");

  const key = `${type}_${item.id}`; // 🔥 clé unique

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

  // 🎬 RÉALISATEUR
  if (type === "movie" && credits?.crew) {
    const director = credits.crew.find((c: any) => c.job === "Director");

    const directorEl = document.createElement("p");
    directorEl.textContent = `Réalisateur : ${director?.name || "N/A"}`;
    container.appendChild(directorEl);
  }

  // 🔥 SECTION COMMENTAIRES
  const reviewsTitle = document.createElement("h2");
  reviewsTitle.textContent = "Commentaires";
  container.appendChild(reviewsTitle);

  // 🟢 FORMULAIRE AJOUT
  const inputName = document.createElement("input");
  inputName.placeholder = "Ton nom";

  const textarea = document.createElement("textarea");
  textarea.placeholder = "Ton commentaire";

  const addBtn = document.createElement("button");
  addBtn.textContent = "Ajouter";

  addBtn.onclick = () => {
    if (!textarea.value) return;

    addComment(key, {
      author: inputName.value || "Utilisateur",
      content: textarea.value,
    });

    renderDetail(item, type, app, goBack, credits, reviews); // refresh
  };

  container.appendChild(inputName);
  container.appendChild(textarea);
  container.appendChild(addBtn);

  // 🟢 COMMENTAIRES LOCAUX
  const localComments = getComments(key);

  localComments.forEach((c: any) => {
    const div = document.createElement("div");

    const author = document.createElement("h4");
    author.textContent = c.author;

    const content = document.createElement("p");
    content.textContent = c.content;

    div.appendChild(author);
    div.appendChild(content);

    container.appendChild(div);
  });

  // 🔵 COMMENTAIRES API
  if (reviews?.results && reviews.results.length > 0) {
    reviews.results.slice(0, 3).forEach((review: any) => {
      const div = document.createElement("div");

      const author = document.createElement("h4");
      author.textContent = review.author;

      const content = document.createElement("p");
      content.textContent = review.content;

      div.appendChild(author);
      div.appendChild(content);

      container.appendChild(div);
    });
  }

  const back = document.createElement("button");
  back.textContent = "Retour";
  back.onclick = goBack;

  container.appendChild(back);

  app.appendChild(container);
};
