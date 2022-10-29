import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IronmanComponent } from './ironman/ironman.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./ironman/ironman.module').then((m) => m.IronmanModule),
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
