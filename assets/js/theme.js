// This script is loaded in <head> so the selected theme is applied before paint.
function determineThemeSetting() {
  return localStorage.getItem("theme") || "system";
}

function determineComputedTheme() {
  const setting = determineThemeSetting();
  if (setting === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return setting;
}

function applyTheme() {
  document.documentElement.setAttribute("data-theme-setting", determineThemeSetting());
  document.documentElement.setAttribute("data-theme", determineComputedTheme());
}

function setThemeSetting(setting) {
  localStorage.setItem("theme", setting);
  applyTheme();
}

function toggleThemeSetting() {
  const setting = determineThemeSetting();
  if (setting === "system") {
    setThemeSetting("light");
  } else if (setting === "light") {
    setThemeSetting("dark");
  } else {
    setThemeSetting("system");
  }
}

function initTheme() {
  applyTheme();
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("light-toggle")?.addEventListener("click", toggleThemeSetting);
});

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
  if (determineThemeSetting() === "system") applyTheme();
});
