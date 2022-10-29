import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, map, tap, combineLatest } from 'rxjs';
import { IronmanStoreService } from '../ironman-store.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input() selectYear: boolean = true;

  years = [
    {
      label: 'All',
      value: '',
    },
    {
      label: '2022',
      value: '2022',
    },
    {
      label: '2021',
      value: '2021',
    },
    {
      label: '2020',
      value: '2020',
    },
    {
      label: '2019',
      value: '2019',
    },
    {
      label: '2018',
      value: '2018',
    },
    {
      label: '2017',
      value: '2017',
    },
    {
      label: '2016',
      value: '2016',
    },
    {
      label: '2015',
      value: '2015',
    },
    {
      label: '2014',
      value: '2014',
    },
    {
      label: '2014前',
      value: 'history',
    },
  ];
  keyword: string = '';
  year: string = '';
  category: string = '';

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
    combineLatest([this.year$, this.key$]).subscribe(
      ([year, key]) => {
        this.keyword = key;
        this.year = year;
      }
    );
  }

  ngOnInit(): void {}

  onYearChange(year: any) {
    const y = year.target.value;
    this.year = y === 'All' ? '' : y;
    this.router.navigate(['list', this.year], {
      queryParams: {
        key: encodeURI(this.keyword),
        category: this.category,
      },
    });
  }

  onSearch(value: string): void {
    this.keyword = value;
    this.router.navigate(['list', this.year], {
      queryParams: {
        key: encodeURI(value),
      },
      queryParamsHandling: 'merge',
    });
  }

  onClear(): void {
    this.router.navigate(['list', this.year], {
      queryParams: {
        key: null,
      },
      queryParamsHandling: 'merge',
    });
  }
}
