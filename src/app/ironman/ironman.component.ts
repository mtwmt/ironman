import { NthKey, NthLabel } from './ironman.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ironman',
  templateUrl: './ironman.component.html',
  styleUrls: ['./ironman.component.scss'],
})
export class IronmanComponent implements OnInit {
  nthLabel = NthLabel;
  nthKey = NthKey;

  constructor() {}

  ngOnInit(): void {}
}
