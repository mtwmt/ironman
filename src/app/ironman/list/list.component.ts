import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, combineLatest, Subject } from 'rxjs';
import { map, takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { IronmanStoreService } from '../ironman-store.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  th!: string;
  private onDestroy$: Subject<boolean> = new Subject<boolean>();

  th$: Observable<string>;
  key$: Observable<string>;

  category$: Observable<string>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public ironmanStoreService: IronmanStoreService
  ) {
    this.th$ = this.activatedRoute.params.pipe(
      map((params: Params) => params['th'] || ''),
      distinctUntilChanged()
    );

    this.key$ = this.activatedRoute.queryParams.pipe(
      map((params: Params) =>
        !!params['key'] ? decodeURI(params['key']) : ''
      ),
      distinctUntilChanged()
    );

    this.category$ = this.activatedRoute.queryParams.pipe(
      map((params: Params) => (!!params['category'] ? params['category'] : '')),
      distinctUntilChanged()
    );
  }

  ngOnInit(): void {
    combineLatest([this.th$, this.category$, this.key$])
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(([th, category, key]) => {
        this.th = th;
        this.ironmanStoreService.filterQuery(key, th, category);
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(false);
    this.onDestroy$.complete();
  }

  removeCate() {
    this.router.navigate(['list', this.th], {
      queryParams: {
        category: null,
      },
      queryParamsHandling: 'merge',
    });
  }
}
