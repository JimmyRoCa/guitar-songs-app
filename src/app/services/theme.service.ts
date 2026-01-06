import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private isDark = false;

  toggleDarkMode() {
    this.isDark = !this.isDark;

    document.body.classList.toggle('dark-mode', this.isDark);
    document.documentElement.style.background = this.isDark
      ? '#000'
      : '#fff';
  }

  isDarkMode() {
    return this.isDark;
  }
}
