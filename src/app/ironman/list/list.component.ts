import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, combineLatest, BehaviorSubject, Subject } from 'rxjs';
import { map, takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { IronmanStoreService } from '../ironman-store.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  private onDestroy$: Subject<boolean> = new Subject<boolean>();

  year$: Observable<string> = this.activatedRoute.params.pipe(
    map((params: Params) => params['year'] || ''),
    distinctUntilChanged()
  );

  key$: Observable<string> = this.activatedRoute.queryParams.pipe(
    map((params: Params) => (!!params['key'] ? decodeURI(params['key']) : '')),
    distinctUntilChanged()
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    public ironmanStoreService: IronmanStoreService
  ) {}

  ngOnInit(): void {
    combineLatest([this.year$, this.key$])
      .pipe(
        takeUntil(this.onDestroy$),
      )
      .subscribe(([year, key]) => {
        this.ironmanStoreService.filterQuery(key, year);
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(false);
    this.onDestroy$.complete();
  }
}
