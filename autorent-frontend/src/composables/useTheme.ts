import { ref } from "vue";

type Theme = "light" | "dark";

const theme = ref<Theme>((localStorage.getItem("theme") as Theme) || "light");

export function useTheme() {
  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme;
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleTheme = () => {
    setTheme(theme.value === "dark" ? "light" : "dark");
  };

  // Инициализация при первой загрузке
  const initTheme = () => {
    if (theme.value === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return {
    theme,
    setTheme,
    toggleTheme,
    initTheme,
  };
}
