import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2, ViewEncapsulation } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  year = new Date().getFullYear()

  constructor(
    private renderer: Renderer2,
    public appService: AppService,
    @Inject(DOCUMENT) private document: Document
  ) {
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
