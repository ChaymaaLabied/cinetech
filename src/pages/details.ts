import {
  getComments,
  addComment,
  addReply,
  addApiReply,
} from "../utils/localComments";
import { createMovieCard } from "../components/movieCard";

/*  HERO   */

const createHeroSection = (item: any) => {
  const row = document.createElement("div");
  row.className = "row g-4 mb-5";

  const posterCol = document.createElement("div");
  posterCol.className = "col-12 col-md-4 col-lg-3";

  const img = document.createElement("img");
  img.className = "img-fluid rounded shadow";
  img.src = item.poster_path
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : "https://placehold.co/500x750?text=No+Image";
  img.alt = item.title || item.name;

  posterCol.appendChild(img);

  const infoCol = document.createElement("div");
  infoCol.className = "col-12 col-md-8 col-lg-9";

  const title = document.createElement("h1");
  title.className = "display-5 fw-bold mb-3";
  title.textContent = item.title || item.name;

  const badges = document.createElement("div");
  badges.className = "mb-3 d-flex flex-wrap gap-2";

  const ratingBadge = document.createElement("span");
  ratingBadge.className = "badge bg-warning text-dark fs-6";
  ratingBadge.textContent = `⭐ ${item.vote_average?.toFixed(1) || "N/A"}`;

  const dateBadge = document.createElement("span");
  dateBadge.className = "badge bg-secondary fs-6";
  dateBadge.textContent = item.release_date || item.first_air_date || "N/A";

  badges.appendChild(ratingBadge);
  badges.appendChild(dateBadge);

  infoCol.appendChild(title);
  infoCol.appendChild(badges);

  if (item.genres?.length) {
    const genresP = document.createElement("p");
    genresP.className = "text-secondary mb-1";
    genresP.textContent = `Genres : ${item.genres.map((g: any) => g.name).join(", ")}`;
    infoCol.appendChild(genresP);
  }

  if (item.origin_country?.length) {
    const countryP = document.createElement("p");
    countryP.className = "text-secondary mb-1";
    countryP.textContent = `Pays : ${item.origin_country.join(", ")}`;
    infoCol.appendChild(countryP);
  }

  if (item.overview) {
    const overviewP = document.createElement("p");
    overviewP.className = "mt-3 lh-lg text-secondary";
    overviewP.textContent = item.overview;
    infoCol.appendChild(overviewP);
  }

  row.appendChild(posterCol);
  row.appendChild(infoCol);

  return row;
};

/*  COMMENT FORM  */

const createCommentForm = (
  onSubmit: (author: string, content: string) => void,
) => {
  const form = document.createElement("div");
  form.className = "card bg-secondary border-0 p-3 mb-4";

  const nameInput = document.createElement("input");
  nameInput.className = "form-control bg-dark text-white border-secondary mb-2";
  nameInput.placeholder = "Ton nom";

  const textarea = document.createElement("textarea");
  textarea.className = "form-control bg-dark text-white border-secondary mb-2";
  textarea.placeholder = "Ton commentaire...";
  (textarea as HTMLTextAreaElement).rows = 3;

  const btn = document.createElement("button");
  btn.className = "btn btn-warning";
  btn.textContent = "Ajouter";

  btn.onclick = () => {
    if (!textarea.value.trim()) return;

    onSubmit(
      (nameInput as HTMLInputElement).value || "Utilisateur",
      textarea.value,
    );

    nameInput.value = "";
    textarea.value = "";
  };

  form.appendChild(nameInput);
  form.appendChild(textarea);
  form.appendChild(btn);

  return form;
};

/*  COMMENT CARD  */

const createCommentCard = (
  comment: any,
  key: string,
  isApi: boolean,
  refresh: () => void,
) => {
  const div = document.createElement("div");
  div.className = "card bg-dark border-secondary mb-2 p-3";

  const author = document.createElement("h6");
  author.className = `text-${isApi ? "info" : "warning"} mb-1`;
  author.textContent = comment.author;

  const content = document.createElement("p");
  content.className = "mb-2 text-secondary";
  content.textContent = comment.content;

  div.appendChild(author);
  div.appendChild(content);

  /* REPLIES BUTTON */

  const replyBtn = document.createElement("button");
  replyBtn.className = `btn btn-sm btn-outline-${isApi ? "info" : "warning"}`;
  replyBtn.textContent = "Répondre";

  const replyForm = document.createElement("div");
  replyForm.className = "mt-2 p-2 bg-secondary rounded";
  replyForm.style.display = "none";

  const nameInput = document.createElement("input");
  nameInput.className =
    "form-control bg-dark text-white border-secondary mb-2 form-control-sm";
  nameInput.placeholder = "Nom";

  const textarea = document.createElement("textarea");
  textarea.className =
    "form-control bg-dark text-white border-secondary mb-2 form-control-sm";
  textarea.placeholder = "Réponse...";
  (textarea as HTMLTextAreaElement).rows = 2;

  const sendBtn = document.createElement("button");
  sendBtn.className = `btn btn-sm btn-${isApi ? "info" : "warning"}`;
  sendBtn.textContent = "Envoyer";

  sendBtn.onclick = () => {
    if (!textarea.value.trim()) return;

    if (isApi) {
      addApiReply(key, {
        author: nameInput.value || "Utilisateur",
        content: textarea.value,
      });
    } else {
      addReply(key, comment.id, {
        author: nameInput.value || "Utilisateur",
        content: textarea.value,
      });
    }

    refresh();
  };

  replyBtn.onclick = () => {
    replyForm.style.display =
      replyForm.style.display === "none" ? "block" : "none";
  };

  replyForm.appendChild(nameInput);
  replyForm.appendChild(textarea);
  replyForm.appendChild(sendBtn);

  div.appendChild(replyBtn);
  div.appendChild(replyForm);

  /* REPLIES DISPLAY */

  if (comment.replies?.length) {
    const repliesDiv = document.createElement("div");
    repliesDiv.className = `mt-2 ps-3 border-start border-${isApi ? "info" : "warning"}`;

    comment.replies.forEach((reply: any) => {
      const replyCard = document.createElement("div");
      replyCard.className = "mb-2 p-2 bg-secondary rounded";

      const replyAuthor = document.createElement("h6");
      replyAuthor.className = `text-${isApi ? "info" : "warning"} mb-1 fs-6`;
      replyAuthor.textContent = `↳ ${reply.author}`;

      const replyContent = document.createElement("p");
      replyContent.className = "mb-0 fs-6";
      replyContent.textContent = reply.content;

      replyCard.appendChild(replyAuthor);
      replyCard.appendChild(replyContent);

      repliesDiv.appendChild(replyCard);
    });

    div.appendChild(repliesDiv);
  }

  return div;
};

/* COMMENTS SECTION */

const renderCommentsSection = (
  key: string,
  item: any,
  type: "movie" | "tv",
  app: HTMLElement,
  goBack: () => void,
  credits: any,
  reviews: any,
  similar: any,
  isApi: boolean,
) => {
  const section = document.createElement("div");

  const comments = isApi ? reviews?.results || [] : getComments(key);

  const refresh = () =>
    renderDetail(item, type, app, goBack, credits, reviews, similar);

  comments.forEach((c: any) => {
    const commentKey = isApi ? `${key}_api_${c.id}` : key;

    if (isApi) {
      c.replies = getComments(commentKey);
    }

    section.appendChild(createCommentCard(c, commentKey, isApi, refresh));
  });

  return section;
};

/*MAIN */

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

  const backBtn = document.createElement("button");
  backBtn.className = "btn btn-outline-secondary mb-4";
  backBtn.textContent = "← Retour";
  backBtn.onclick = goBack;

  container.appendChild(backBtn);
  container.appendChild(createHeroSection(item));

  const commentsSection = document.createElement("div");
  commentsSection.className = "border-top border-secondary pt-4";

  const title = document.createElement("h2");
  title.className = "h4 mb-4";
  title.textContent = "💬 Commentaires";

  commentsSection.appendChild(title);

  commentsSection.appendChild(
    createCommentForm((author, content) => {
      addComment(key, { author, content });
      renderDetail(item, type, app, goBack, credits, reviews, similar);
    }),
  );

  commentsSection.appendChild(
    renderCommentsSection(
      key,
      item,
      type,
      app,
      goBack,
      credits,
      reviews,
      similar,
      false,
    ),
  );

  commentsSection.appendChild(
    renderCommentsSection(
      key,
      item,
      type,
      app,
      goBack,
      credits,
      reviews,
      similar,
      true,
    ),
  );

  container.appendChild(commentsSection);

  /*  SIMILAR  */

  if (similar?.results?.length) {
    const similarSection = document.createElement("div");
    similarSection.className = "border-top border-secondary pt-4 mb-4";

    const similarTitle = document.createElement("h2");
    similarTitle.className = "h4 mb-3";
    similarTitle.textContent =
      type === "movie" ? "🎥 Films similaires" : "📺 Séries similaires";

    similarSection.appendChild(similarTitle);

    const row = document.createElement("div");
    row.className =
      "row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3";

    similar.results.slice(0, 10).forEach((item: any) => {
      row.appendChild(createMovieCard(item, type));
    });

    similarSection.appendChild(row);
    container.appendChild(similarSection);
  }

  app.appendChild(container);
};
