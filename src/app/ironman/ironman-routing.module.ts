import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IronmanComponent } from './ironman.component';
import { ListComponent } from './list/list.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: '',
    component: IronmanComponent,
  },
  {
    path: 'list',
    component: ListComponent,
  },
  {
    path: 'list/:year',
    component: ListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IronmanRoutingModule {}
