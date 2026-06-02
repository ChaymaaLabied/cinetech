import { getComments, addComment } from "../utils/localComments";
import { createMovieCard } from "../components/movieCard";

export const renderDetail = (
  item: any,
  type: "movie" | "tv",
  app: HTMLElement | null,
  goBack: () => void,
  credits?: any,
  reviews?: any,
  similar?: any,
) => {
  if (!app) return;

  app.innerHTML = "";

  const key = `${type}_${item.id}`;

  const container = document.createElement("div");
  container.className = "container-fluid py-4";

  // Back button
  const back = document.createElement("button");
  back.className = "btn btn-outline-secondary mb-4";
  back.textContent = "← Retour";
  back.onclick = goBack;
  container.appendChild(back);

  // Hero row: poster + info
  const row = document.createElement("div");
  row.className = "row g-4 mb-5";

  // Poster
  const posterCol = document.createElement("div");
  posterCol.className = "col-12 col-md-4 col-lg-3";
  const img = document.createElement("img");
  img.className = "img-fluid rounded shadow";
  img.src = item.poster_path
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : "https://placehold.co/500x750?text=No+Image";
  img.alt = item.title || item.name;
  posterCol.appendChild(img);

  // Info
  const infoCol = document.createElement("div");
  infoCol.className = "col-12 col-md-8 col-lg-9";

  const title = document.createElement("h1");
  title.className = "display-5 fw-bold mb-3";
  title.textContent = item.title || item.name;

  const badgesRow = document.createElement("div");
  badgesRow.className = "mb-3 d-flex flex-wrap gap-2";

  const rating = document.createElement("span");
  rating.className = "badge bg-warning text-dark fs-6";
  rating.textContent = `⭐ ${item.vote_average?.toFixed(1) || "N/A"}`;

  const dateBadge = document.createElement("span");
  dateBadge.className = "badge bg-secondary fs-6";
  dateBadge.textContent = item.release_date || item.first_air_date || "N/A";

  badgesRow.appendChild(rating);
  badgesRow.appendChild(dateBadge);

  const genres = document.createElement("p");
  genres.className = "text-secondary mb-1";
  genres.textContent =
    "Genres : " + (item.genres?.map((g: any) => g.name).join(", ") || "N/A");

  const country = document.createElement("p");
  country.className = "text-secondary mb-1";
  country.textContent = "Pays : " + (item.origin_country?.join(", ") || "N/A");

  infoCol.appendChild(title);
  infoCol.appendChild(badgesRow);
  infoCol.appendChild(genres);
  infoCol.appendChild(country);

  if (credits?.cast) {
    const actors = document.createElement("p");
    actors.className = "text-secondary mb-1";
    actors.textContent =
      "Acteurs : " +
      credits.cast
        .slice(0, 5)
        .map((a: any) => a.name)
        .join(", ");
    infoCol.appendChild(actors);
  }

  if (type === "movie" && credits?.crew) {
    const director = credits.crew.find((c: any) => c.job === "Director");
    const directorEl = document.createElement("p");
    directorEl.className = "text-secondary mb-1";
    directorEl.textContent = `Réalisateur : ${director?.name || "N/A"}`;
    infoCol.appendChild(directorEl);
  }

  const overview = document.createElement("p");
  overview.className = "mt-3 lh-lg";
  overview.textContent = item.overview;
  infoCol.appendChild(overview);

  row.appendChild(posterCol);
  row.appendChild(infoCol);
  container.appendChild(row);

  // Comments section
  const commentsSection = document.createElement("div");
  commentsSection.className = "border-top border-secondary pt-4";

  const reviewsTitle = document.createElement("h2");
  reviewsTitle.className = "h4 mb-4";
  reviewsTitle.textContent = "💬 Commentaires";
  commentsSection.appendChild(reviewsTitle);

  // Comment form
  const formCard = document.createElement("div");
  formCard.className = "card bg-secondary border-0 p-3 mb-4";

  const inputName = document.createElement("input");
  inputName.className = "form-control bg-dark text-white border-secondary mb-2";
  inputName.placeholder = "Ton nom";

  const textarea = document.createElement("textarea");
  textarea.className = "form-control bg-dark text-white border-secondary mb-2";
  textarea.placeholder = "Ton commentaire...";
  (textarea as HTMLTextAreaElement).rows = 3;

  const addBtn = document.createElement("button");
  addBtn.className = "btn btn-warning";
  addBtn.textContent = "Ajouter";
  addBtn.onclick = () => {
    if (!textarea.value) return;
    addComment(key, {
      author: inputName.value || "Utilisateur",
      content: textarea.value,
    });
    renderDetail(item, type, app, goBack, credits, reviews);
  };

  formCard.appendChild(inputName);
  formCard.appendChild(textarea);
  formCard.appendChild(addBtn);
  commentsSection.appendChild(formCard);

  // Local comments
  const localComments = getComments(key);
  localComments.forEach((c: any) => {
    const div = document.createElement("div");
    div.className = "card bg-dark border-secondary mb-2 p-3";
    const author = document.createElement("h6");
    author.className = "text-warning mb-1";
    author.textContent = c.author;
    const content = document.createElement("p");
    content.className = "mb-0";
    content.textContent = c.content;
    div.appendChild(author);
    div.appendChild(content);
    commentsSection.appendChild(div);
  });

  // API reviews
  if (reviews?.results && reviews.results.length > 0) {
    reviews.results.slice(0, 3).forEach((review: any) => {
      const div = document.createElement("div");
      div.className = "card bg-dark border-secondary mb-2 p-3";
      const author = document.createElement("h6");
      author.className = "text-info mb-1";
      author.textContent = review.author;
      const content = document.createElement("p");
      content.className = "mb-0 text-secondary";
      content.textContent = review.content;
      div.appendChild(author);
      div.appendChild(content);
      commentsSection.appendChild(div);
    });
  }

  // Similar section
  if (similar?.results && similar.results.length > 0) {
    const similarSection = document.createElement("div");
    similarSection.className = "border-top border-secondary pt-4 mb-4";

    const similarTitle = document.createElement("h2");
    similarTitle.className = "h4 mb-3";
    similarTitle.textContent =
      type === "movie" ? "🎥 Films similaires" : "📺 Séries similaires";
    similarSection.appendChild(similarTitle);

    const similarRow = document.createElement("div");
    similarRow.className =
      "row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3";

    similar.results.slice(0, 10).forEach((similarItem: any) => {
      similarRow.appendChild(createMovieCard(similarItem, type));
    });

    similarSection.appendChild(similarRow);
    container.appendChild(similarSection);
  }

  container.appendChild(commentsSection);
  app.appendChild(container);
};
