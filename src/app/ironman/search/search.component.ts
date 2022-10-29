import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, map, tap, combineLatest } from 'rxjs';
import { IronmanStoreService } from '../ironman-store.service';

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
  @Input() isSelectYear: boolean = true;

  selectYear = new FormControl();

  years = [
    {
      label: 'All',
      value: '',
    },
    {
      label: '第13屆(2022)',
      value: '2022',
    },
    {
      label: '第12屆(2021)',
      value: '2021',
    },
    {
      label: '第11屆(2020)',
      value: '2020',
    },
    {
      label: '第10屆(2019)',
      value: '2019',
    },
    {
      label: '第9屆(2018)',
      value: '2018',
    },
    {
      label: '第8屆(2017)',
      value: '2017',
    },
    // {
    //   label: '2016',
    //   value: '2016',
    // },
    // {
    //   label: '2015',
    //   value: '2015',
    // },
    {
      label: '第7屆(2014)',
      value: '2014',
    },
    {
      label: '第7屆(2014)前',
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
    combineLatest([this.year$, this.key$]).subscribe(([year, key]) => {
      this.keyword = key;
      this.selectYear.setValue(year);
      this.year = year;
    });
  }

  ngOnInit(): void {}

  onYearChange(year: any) {

    this.router.navigate(['list', year], {
      queryParams: {
        key: encodeURI(this.keyword),
      },
      queryParamsHandling: 'merge',
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

  compareFn(a: option, b: option): boolean {
    return a && b ? a.value === b.value : a === b;
  }
}
