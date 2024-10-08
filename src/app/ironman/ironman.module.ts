import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IronmanRoutingModule } from './ironman-routing.module';
import { IronmanComponent } from './ironman.component';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { SearchComponent } from './search/search.component';
import { CommentsComponent } from '../comments/comments.component';
import { IsbnComponent } from '../isbn/isbn.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  declarations: [
    IronmanComponent,
    ListComponent,
    SearchComponent,
    CommentsComponent,
    IsbnComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IronmanRoutingModule,
    FontAwesomeModule,
    ZXingScannerModule,
  ],
})
export class IronmanModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far, fab);
  }
}
