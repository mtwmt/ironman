import { NthKey, NthLabel } from './ironman.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ironman',
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
