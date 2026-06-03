import {
  getComments,
  addComment,
  addReply,
  addApiReply,
} from "../utils/localComments";
import { createMovieCard } from "../components/movieCard";

// Generic DOM helpers
const el = (tag: string, className = "", html = ""): HTMLElement => {
  const elem = document.createElement(tag);
  if (className) elem.className = className;
  if (html) elem.innerHTML = html;
  return elem;
};

const createReplyForm = (
  onSend: (author: string, content: string) => void,
  buttonColor = "warning",
) => {
  const form = el("div", "mt-2 p-2 bg-secondary rounded");
  form.style.display = "none";

  const nameInput = el("input") as HTMLInputElement;
  nameInput.type = "text";
  nameInput.className =
    "form-control bg-dark text-white border-secondary mb-2 form-control-sm";
  nameInput.placeholder = "Ton nom";

  const textarea = el("textarea") as HTMLTextAreaElement;
  textarea.className =
    "form-control bg-dark text-white border-secondary mb-2 form-control-sm";
  textarea.placeholder = "Ta réponse...";
  textarea.rows = 2;

  const sendBtn = el("button", `btn btn-sm btn-${buttonColor}`, "Envoyer");
  sendBtn.onclick = () => {
    if (textarea.value.trim()) {
      onSend(nameInput.value || "Utilisateur", textarea.value);
      nameInput.value = "";
      textarea.value = "";
    }
  };

  form.append(nameInput, textarea, sendBtn);
  return form;
};

const createReplyDisplay = (replies: any[], borderColor = "warning") => {
  const container = el("div", `mt-2 ps-3 border-start border-${borderColor}`);
  replies.forEach((r) => {
    container.innerHTML += `
      <div class="mb-2 p-2 bg-secondary rounded">
        <h6 class="text-info mb-1 fs-6">↳ ${r.author}</h6>
        <p class="mb-0 text-secondary fs-6">${r.content}</p>
      </div>`;
  });
  return container;
};

const createHeroSection = (item: any) => {
  const row = el("div", "row g-4 mb-5");

  const posterCol = el(
    "div",
    "col-12 col-md-4 col-lg-3",
    `<img class="img-fluid rounded shadow" src="${
      item.poster_path
        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
        : "https://placehold.co/500x750?text=No+Image"
    }" alt="${item.title || item.name}">`,
  );

  const infoCol = el("div", "col-12 col-md-8 col-lg-9");
  const title = el("h1", "display-5 fw-bold mb-3", item.title || item.name);
  const badges = el("div", "mb-3 d-flex flex-wrap gap-2");
  badges.innerHTML = `
    <span class="badge bg-warning text-dark fs-6">⭐ ${item.vote_average?.toFixed(1) || "N/A"}</span>
    <span class="badge bg-secondary fs-6">${item.release_date || item.first_air_date || "N/A"}</span>`;

  infoCol.append(title, badges);

  const info = [
    {
      label: "Genres",
      value: item.genres?.map((g: any) => g.name).join(", ") || "N/A",
    },
    { label: "Pays", value: item.origin_country?.join(", ") || "N/A" },
    {
      label: "Acteurs",
      value: item.cast
        ?.slice(0, 5)
        .map((a: any) => a.name)
        .join(", "),
    },
  ];

  info.forEach(({ label, value }) => {
    if (value)
      infoCol.appendChild(
        el("p", "text-secondary mb-1", `${label} : ${value}`),
      );
  });

  infoCol.appendChild(el("p", "mt-3 lh-lg", item.overview));
  row.append(posterCol, infoCol);

  return row;
};

const createCommentForm = (
  onSubmit: (author: string, content: string) => void,
) => {
  const form = el("div", "card bg-secondary border-0 p-3 mb-4");

  const nameInput = el("input") as HTMLInputElement;
  nameInput.className = "form-control bg-dark text-white border-secondary mb-2";
  nameInput.placeholder = "Ton nom";

  const textarea = el("textarea") as HTMLTextAreaElement;
  textarea.className = "form-control bg-dark text-white border-secondary mb-2";
  textarea.placeholder = "Ton commentaire...";
  textarea.rows = 3;

  const addBtn = el("button", "btn btn-warning", "Ajouter");
  addBtn.onclick = () => {
    if (textarea.value.trim()) {
      onSubmit(nameInput.value || "Utilisateur", textarea.value);
      nameInput.value = "";
      textarea.value = "";
    }
  };

  form.append(nameInput, textarea, addBtn);
  return form;
};

const renderComments = (
  key: string,
  item: any,
  type: string,
  app: HTMLElement | null,
  goBack: () => void,
  credits: any,
  reviews: any,
  similar: any,
  isApi = false,
) => {
  const section = el("div");
  const comments = isApi
    ? reviews?.results?.slice(0, 3) || []
    : getComments(key);

  comments.forEach((c: any, idx: number) => {
    const div = el("div", "card bg-dark border-secondary mb-2 p-3");
    const apiKey = isApi ? `${key}_api_${idx}` : key;
    const replyKey = isApi ? apiKey : key;
    const replies = getComments(replyKey);

    div.innerHTML = `
      <h6 class="text-${isApi ? "info" : "warning"} mb-1">${c.author}</h6>
      <p class="mb-2 text-secondary">${c.content}</p>`;

    const replyBtn = el(
      "button",
      `btn btn-sm btn-outline-${isApi ? "info" : "warning"}`,
      "Répondre",
    );
    const replyForm = createReplyForm(
      (author, content) => {
        if (isApi) addApiReply(replyKey, { author, content });
        else addReply(key, idx, { author, content });
        renderDetail(
          item,
          type as "movie" | "tv",
          app,
          goBack,
          credits,
          reviews,
          similar,
        );
      },
      isApi ? "info" : "warning",
    );

    replyBtn.onclick = () => {
      replyForm.style.display =
        replyForm.style.display === "none" ? "block" : "none";
    };

    div.append(replyBtn, replyForm);
    if (replies?.length)
      div.appendChild(createReplyDisplay(replies, isApi ? "info" : "warning"));

    section.appendChild(div);
  });

  return section;
};

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
  const container = el("div", "container-fluid py-4");

  const backBtn = el("button", "btn btn-outline-secondary mb-4", "← Retour");
  backBtn.onclick = goBack;
  container.appendChild(backBtn);

  container.appendChild(createHeroSection(item));

  const commentsSection = el("div", "border-top border-secondary pt-4");
  commentsSection.appendChild(el("h2", "h4 mb-4", "💬 Commentaires"));
  commentsSection.appendChild(
    createCommentForm((author, content) => {
      addComment(key, { author, content });
      renderDetail(item, type, app, goBack, credits, reviews, similar);
    }),
  );

  commentsSection.appendChild(
    renderComments(key, item, type, app, goBack, credits, reviews, similar),
  );
  commentsSection.appendChild(
    renderComments(
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

  if (similar?.results?.length) {
    const similarSection = el("div", "border-top border-secondary pt-4 mb-4");
    similarSection.appendChild(
      el(
        "h2",
        "h4 mb-3",
        type === "movie" ? "🎥 Films similaires" : "📺 Séries similaires",
      ),
    );
    const row = el(
      "div",
      "row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3",
    );
    similar.results.slice(0, 10).forEach((item: any) => {
      row.appendChild(createMovieCard(item, type));
    });
    similarSection.appendChild(row);
    container.appendChild(similarSection);
  }

  app.appendChild(container);
};
