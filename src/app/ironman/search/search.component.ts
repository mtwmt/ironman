import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { IronmanStoreService } from '../ironman-store.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input() selectYear: boolean = true;

  years = [
    'All',
    '2022',
    '2021',
    '2020',
    '2019',
    '2018',
    '2017',
    '2016',
    '2015',
    '2014',
    '2014前',
  ];
  keyword: string = '';
  year: string = '';

  year$: Observable<string> = this.activatedRoute.params.pipe(
    map((params: Params) => params['year'] ?? '')
  );

  key$: Observable<string> = this.activatedRoute.queryParams.pipe(
    map((params: Params) => (!!params['key'] ? decodeURI(params['key']) : ''))
  );

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public ironmanStoreService: IronmanStoreService
  ) {
    this.key$.subscribe((key) => {
      this.keyword = key;
    });

    this.year$.subscribe((y) => (this.year = y));
  }

  ngOnInit(): void {}

  onYearChange(year: any) {
    const y = year.target.value;
    this.year = y === 'All' ? '' : y;

    this.router.navigate(['list', this.year], {
      queryParams: {
        key: encodeURI(this.keyword),
      },
    });
  }

  onSearch(value: string): void {
    this.keyword = value;
    this.router.navigate(['list', this.year], {
      queryParams: {
        key: encodeURI(value),
      },
    });
  }
}
