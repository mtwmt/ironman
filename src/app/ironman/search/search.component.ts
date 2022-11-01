import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, map, tap, combineLatest } from 'rxjs';
import { IronmanStoreService } from '../ironman-store.service';
import { NthKey, NthLabel } from '../ironman.model';

interface option {
  label: string;
  value: string;
}
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input() isSelectNth: boolean = true;

  selectNth = new FormControl();

  nth = [
    {
      label: NthLabel.All,
      value: NthKey.All,
    },
    {
      label: NthLabel.Th14,
      value: NthKey.Th14,
    },
    {
      label: NthLabel.Th13,
      value: NthKey.Th13,
    },
    {
      label: NthLabel.Th12,
      value: NthKey.Th12,
    },
    {
      label: NthLabel.Th11,
      value: NthKey.Th11,
    },
    {
      label: NthLabel.Th10,
      value: NthKey.Th10,
    },
    {
      label: NthLabel.Th9,
      value: NthKey.Th9,
    },
    {
      label: NthLabel.Th8,
      value: NthKey.Th8,
    },
    {
      label: NthLabel.Th7,
      value: NthKey.Th7,
    },
    {
      label: NthLabel.History,
      value: NthKey.History,
    },
  ];
  keyword: string = '';
  th: string = '';
  category: string = '';

  th$: Observable<string> = this.activatedRoute.params.pipe(
    map((params: Params) => params['th'] ?? '')
  );

  key$: Observable<string> = this.activatedRoute.queryParams.pipe(
    map((params: Params) => (!!params['key'] ? decodeURI(params['key']) : ''))
  );

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public ironmanStoreService: IronmanStoreService
  ) {
    combineLatest([this.th$, this.key$]).subscribe(([year, key]) => {
      this.keyword = key;
      this.selectNth.setValue(year);
      this.th = year;
    });
  }

  ngOnInit(): void {}

  onNthChange(th: any) {
    this.router.navigate(['list', th], {
      queryParams: {
        key: encodeURI(this.keyword),
      },
      queryParamsHandling: 'merge',
    });
  }

  onSearch(value: string): void {
    this.keyword = value;
    this.router.navigate(['list', this.th], {
      queryParams: {
        key: encodeURI(value),
      },
      queryParamsHandling: 'merge',
    });
  }

  onClear(): void {
    this.router.navigate(['list', this.th], {
      queryParams: {
        key: null,
      },
      queryParamsHandling: 'merge',
    });
  }

  compareFn(a: option, b: option): boolean {
    return a && b ? a.value === b.value : a === b;
  }
}
