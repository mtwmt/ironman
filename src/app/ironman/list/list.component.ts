import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { IronmanStoreService } from '../ironman-store.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  destroyRef = inject(DestroyRef);

  th!: string;

  th$: Observable<string>;
  key$: Observable<string>;
  category$: Observable<string>;
  author$: Observable<string>;

  isAuthorSearch$: Observable<boolean>;

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

    this.category$ = this.activatedRoute.queryParams.pipe(
      map((params: Params) => (!!params['category'] ? params['category'] : '')),
      distinctUntilChanged()
    );

    this.author$ = this.activatedRoute.queryParams.pipe(
      takeUntilDestroyed(this.destroyRef),
      map((params: Params) => (!!params['author'] ? params['author'] : '')),
      distinctUntilChanged()
    );

    this.isAuthorSearch$ = this.activatedRoute.queryParams.pipe(
      map((params: Params) => {
        return Object.keys(params).includes('author');
      })
    );
  }

  ngOnInit(): void {
    combineLatest([this.th$, this.category$, this.key$])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([th, category, key]) => {
        this.th = th;
        this.ironmanStoreService.filterQuery(key, th, category);
      });

    this.author$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((author) => {
        // console.log('sss', res)
        this.ironmanStoreService.filterAuthor(author);
      });
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
