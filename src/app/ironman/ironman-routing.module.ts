import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IronmanComponent } from './ironman.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: IronmanComponent,
  },
  {
    path: 'list',
    children: [
      {
        path: ':th',
        component: ListComponent,
      },
      {
        path: '**',
        component: ListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IronmanRoutingModule {}
