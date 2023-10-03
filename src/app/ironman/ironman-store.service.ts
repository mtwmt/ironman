import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  map,
  Observable,
  of,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';
import { IronmanListInfo, NthKey } from './ironman.model';
import { IronmanService } from './ironman.service';

@Injectable({
  providedIn: 'root',
})
export class IronmanStoreService {
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  private ironmanObservables: { [key: string]: Observable<IronmanListInfo[]> } =
    {};

  public getIronmanList$: BehaviorSubject<IronmanListInfo[]> =
    new BehaviorSubject([] as IronmanListInfo[]);

  private ironmanTh = [
    NthKey.All,
    NthKey.Th15,
    NthKey.Th14,
    NthKey.Th13,
    NthKey.Th12,
    NthKey.Th11,
    NthKey.Th10,
    NthKey.Th9,
    NthKey.Th8,
    NthKey.Th7,
    NthKey.History,
  ];

  constructor(private ironmanService: IronmanService) {
    this.ironmanTh.forEach((th) => {
      if (th !== NthKey.All) {
        this.ironmanObservables[th] = this.ironmanService
          .fetchIronman(th)
          .pipe(shareReplay(1));
      }
    });
  }

  filterNthObservable(th: string = '') {
    return combineLatest(Object.values(this.ironmanObservables)).pipe(
      tap(() => {
        this.isLoading$.next(true);
      }),
      map((list) => {
        if (th in this.ironmanObservables) {
          const keys = Object.keys(this.ironmanObservables);
          const idx = keys.indexOf(th);

          return list[idx];
        } else {
          return list.reduce((acc, list) => acc.concat(list), []);
        }
      })
    );
  }

  filterCategory(th: string = '', category: string = '') {
    return this.filterNthObservable(th).pipe(
      tap(() => this.isLoading$.next(true)),
      map((list: any) => {
        return list.filter((d: IronmanListInfo) => {
          return d.category
            .toLocaleLowerCase()
            .includes(category.toLocaleLowerCase());
        });
      })
    );
  }

  filterQuery(query: string, th: string = '', category: string = '') {
    of(query)
      .pipe(
        debounceTime(700),
        switchMap((val) => {
          return this.filterCategory(th, category).pipe(
            map((list) => {
              return list.filter((d: IronmanListInfo) => {
                return d.topic
                  .toLocaleLowerCase()
                  .includes(val.toLocaleLowerCase());
              });
            })
          );
        })
      )
      .subscribe((res) => {
        this.getIronmanList$.next(res);
        this.isLoading$.next(false);
      });
  }
}
