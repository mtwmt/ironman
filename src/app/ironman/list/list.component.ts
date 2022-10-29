import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, combineLatest, BehaviorSubject, Subject } from 'rxjs';
import { map, takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { IronmanStoreService } from '../ironman-store.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  year!: string;
  private onDestroy$: Subject<boolean> = new Subject<boolean>();

  year$: Observable<string> = this.activatedRoute.params.pipe(
    map((params: Params) => params['year'] || ''),
    distinctUntilChanged(),
  );

  key$: Observable<string> = this.activatedRoute.queryParams.pipe(
    map((params: Params) => (!!params['key'] ? decodeURI(params['key']) : '')),
    distinctUntilChanged()
  );

  category$: Observable<string> = this.activatedRoute.queryParams.pipe(
    map((params: Params) =>
      !!params['category'] ? params['category'] : ''
    ),
    distinctUntilChanged()
  );

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public ironmanStoreService: IronmanStoreService
  ) {}

  ngOnInit(): void {
    combineLatest([this.year$, this.category$, this.key$])
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(([year, category, key]) => {
        this.year = year;
        this.ironmanStoreService.filterQuery(key, year, category);
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(false);
    this.onDestroy$.complete();
  }

  removeCate() {
    this.router.navigate(['list', this.year], {
      queryParams: {
        category: null,
      },
      queryParamsHandling: 'merge',
    });
  }
}
