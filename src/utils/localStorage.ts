export const getFavorites = () => {
  return JSON.parse(localStorage.getItem("favorites") || "[]");
};

export const saveFavorites = (favorites: any[]) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};
