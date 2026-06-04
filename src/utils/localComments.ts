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

  const newComment = {
    ...comment,
    id: Date.now(),
    replies: [],
  };

  comments[key].push(newComment);

  localStorage.setItem("comments", JSON.stringify(comments));
};

export const addReply = (key: string, commentId: number, reply: any) => {
  const data = localStorage.getItem("comments");
  const comments = data ? JSON.parse(data) : {};

  if (comments[key]) {
    const comment = comments[key].find((c: any) => c.id === commentId);
    if (comment) {
      const newReply = {
        ...reply,
        id: Date.now(),
      };
      if (!comment.replies) {
        comment.replies = [];
      }
      comment.replies.push(newReply);
      localStorage.setItem("comments", JSON.stringify(comments));
    }
  }
};

export const addApiReply = (key: string, reply: any) => {
  const comments = getComments(key);
  comments.push(reply);

  const data = localStorage.getItem("comments");
  const allComments = data ? JSON.parse(data) : {};
  allComments[key] = comments;
  localStorage.setItem("comments", JSON.stringify(allComments));
};
