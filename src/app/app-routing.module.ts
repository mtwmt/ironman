import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { IronmanComponent } from './ironman/ironman.component';
import { IsbnComponent } from './isbn/isbn.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./ironman/ironman.module').then((m) => m.IronmanModule),
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'isbn',
    component: IsbnComponent,
  },
  {
    path: '**',
    component: IronmanComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
