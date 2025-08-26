import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterLink, FontAwesomeModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  year = new Date().getFullYear();

  constructor(
    private renderer: Renderer2,
    public appService: AppService,
    @Inject(DOCUMENT) private document: Document,
    private library: FaIconLibrary
  ) {
    this.library.addIconPacks(fas, far, fab);
    this.initTheme();
  }

  initTheme(): void {
    const theme = localStorage.getItem('theme') || '';
    this.onThemeChange(theme);
  }

  onThemeChange(theme: string = ''): void {
    this.appService.theme$.next(theme);
    if (!theme) {
      this.renderer.removeClass(this.document.body, 'dark');
      localStorage.removeItem('theme');
    } else {
      this.renderer.addClass(this.document.body, 'dark');
      localStorage.setItem('theme', 'dark');
    }
  }
}
