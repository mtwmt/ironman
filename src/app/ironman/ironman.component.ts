import { NthKey, NthLabel } from './ironman.model';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { CommentsComponent } from '../comments/comments.component';

@Component({
  selector: 'app-ironman',
  imports: [CommonModule, RouterModule, SearchComponent, CommentsComponent],
  templateUrl: './ironman.component.html',
  styleUrls: ['./ironman.component.scss'],
})
export class IronmanComponent implements OnInit {
  nthOptions = Object.keys(NthKey).map((k: string) => ({
    label: NthLabel[k as keyof typeof NthLabel],
    value: NthKey[k as keyof typeof NthKey],
  }));

  constructor() {}

  ngOnInit(): void {}
}
