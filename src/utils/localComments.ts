const getCommentsData = () => {
  const data = localStorage.getItem("comments");
  return data ? JSON.parse(data) : {};
};

const saveCommentsData = (comments: any) => {
  localStorage.setItem("comments", JSON.stringify(comments));
};

export const getComments = (key: string) => {
  return getCommentsData()[key] || [];
};

export const addComment = (key: string, comment: any) => {
  const comments = getCommentsData();
  if (!comments[key]) {
    comments[key] = [];
  }
  comments[key].push({ ...comment, replies: [] });
  saveCommentsData(comments);
};

export const addReply = (key: string, index: number, reply: any) => {
  const comments = getCommentsData();
  if (!comments[key]) {
    comments[key] = [];
  }
  if (!comments[key][index]) {
    comments[key][index] = { replies: [] };
  }
  if (!comments[key][index].replies) {
    comments[key][index].replies = [];
  }
  comments[key][index].replies.push(reply);
  saveCommentsData(comments);
};

export const addApiReply = (key: string, reply: any) => {
  const comments = getCommentsData();
  if (!comments[key]) {
    comments[key] = [];
  }
  comments[key].push(reply);
  saveCommentsData(comments);
};
