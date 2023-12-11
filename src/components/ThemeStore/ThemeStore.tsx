import { makeAutoObservable } from 'mobx';

class ThemeStore {
  theme = "light"; // Valeurs possibles : "light" ou "dark"

  constructor() {
    makeAutoObservable(this);
    this.loadTheme();
  }

  toggleTheme() {
    this.theme = this.theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", this.theme);
  }

  loadTheme() {
    const savedTheme = localStorage.getItem("theme");
    this.theme = savedTheme || "light";
  }
}

export const themeStore = new ThemeStore();
