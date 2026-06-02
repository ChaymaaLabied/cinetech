export const createFooter = () => {
  const footer = document.createElement("footer");
  footer.className =
    "bg-dark text-secondary text-center py-3 mt-auto border-top border-secondary";
  footer.textContent = "© 2026 Cinetech — All rights reserved";

  return footer;
};
