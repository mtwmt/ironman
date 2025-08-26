import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, map, tap, combineLatest } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IronmanStoreService } from '../ironman-store.service';
import { NthKey, NthLabel } from '../ironman.model';

interface option {
  label: string;
  value: string;
}
@Component({
  selector: 'app-search',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, FontAwesomeModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input() isSelectNth: boolean = true;

  selectNth = new FormControl();

  nthOptions = Object.keys(NthKey).map((k: string) => ({
    label: NthLabel[k as keyof typeof NthLabel],
    value: NthKey[k as keyof typeof NthKey],
  }));

  keyword: string = '';
  th: string = '';
  category: string = '';
  th$: Observable<string>;
  key$: Observable<string>;

  isAuthorSearch$: Observable<boolean>;
  author: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public ironmanStoreService: IronmanStoreService
  ) {
    this.th$ = this.activatedRoute.params.pipe(
      map((params: Params) => params['th'] ?? '')
    );

    this.key$ = this.activatedRoute.queryParams.pipe(
      map((params: Params) => (!!params['key'] ? decodeURI(params['key']) : ''))
    );

    this.isAuthorSearch$ = this.activatedRoute.queryParams.pipe(
      map((params: Params) => {
        return Object.keys(params).includes('author');
      })
    );

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

  onAuthorSearch(value: string): void {
    this.router.navigate(['list'], {
      queryParams: {
        author: encodeURI(value),
      },
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
