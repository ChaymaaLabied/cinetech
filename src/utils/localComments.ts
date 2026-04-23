export const getComments = (key: string) => {
  const data = localStorage.getItem("comments");
  const comments = data ? JSON.parse(data) : {};

  return comments[key] || [];
};

export const addComment = (key: string, comment: any) => {
  const data = localStorage.getItem("comments");
  const comments = data ? JSON.parse(data) : {};

  if (!comments[key]) {
    comments[key] = [];
  }

  comments[key].push(comment);

  localStorage.setItem("comments", JSON.stringify(comments));
};
