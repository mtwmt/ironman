import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./ironman/ironman.component').then((m) => m.IronmanComponent),
  },
  {
    path: 'list/:th',
    loadComponent: () =>
      import('./ironman/list/list.component').then((m) => m.ListComponent),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./ironman/ironman.component').then((m) => m.IronmanComponent),
  },
];