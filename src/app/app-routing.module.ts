import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { IronmanComponent } from './ironman/ironman.component';

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
    path: '**',
    component: IronmanComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
