(() => {
  const storageKey = "fanmania-theme";
  const root = document.documentElement;
  const savedTheme = localStorage.getItem(storageKey);

  function applyTheme(theme) {
    if (theme === "dark") {
      root.dataset.theme = "dark";
    } else {
      delete root.dataset.theme;
    }

    const toggle = document.getElementById("theme-toggle");
    if (toggle) {
      const darkMode = theme === "dark";
      toggle.setAttribute("aria-pressed", String(darkMode));
      toggle.setAttribute("aria-label", darkMode ? "Turn off dark mode" : "Turn on dark mode");
      toggle.title = darkMode ? "Turn off dark mode" : "Turn on dark mode";
    }

    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.content = theme === "dark" ? "#11141a" : "#ffffff";
  }

  applyTheme(savedTheme);

  document.addEventListener("DOMContentLoaded", () => {
    applyTheme(localStorage.getItem(storageKey));
    const toggle = document.getElementById("theme-toggle");
    if (!toggle) return;

    toggle.addEventListener("click", () => {
      const theme = root.dataset.theme === "dark" ? "light" : "dark";
      localStorage.setItem(storageKey, theme);
      applyTheme(theme);
    });
  });

  window.addEventListener("storage", event => {
    if (event.key === storageKey) applyTheme(event.newValue);
  });
})();
