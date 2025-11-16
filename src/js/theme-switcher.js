import { refs } from "./refs";

const THEME_KEY = "theme";

export function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || "light";
  applyTheme(savedTheme);
}

export function toggleTheme() {
  const currentTheme = document.body.classList.contains("theme-dark")
    ? "dark"
    : "light";

  const newTheme = currentTheme === "dark" ? "light" : "dark";
  applyTheme(newTheme);
  localStorage.setItem(THEME_KEY, newTheme);
}

function applyTheme(theme) {
  document.body.classList.remove("theme-light", "theme-dark");

  if (theme === "dark") {
    document.body.classList.add("theme-dark");
  } else {
    document.body.classList.add("theme-light");
  }
}