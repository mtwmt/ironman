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

  private ironmanTh = Object.entries(NthKey).map(([key, value]) => value);

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
            .includes(decodeURI(category.toLocaleLowerCase()));
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
                  .includes(decodeURI(val.toLocaleLowerCase()));
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

  filterAuthor(author: string) {
    return this.filterNthObservable('')
      .pipe(
        tap(() => this.isLoading$.next(true)),
        map((list: any) => {
          return list.filter((d: IronmanListInfo) => {
            return d.author
              .toLocaleLowerCase()
              .includes(decodeURI(author.toLocaleLowerCase()));
          });
        })
      )
      .subscribe((res) => {
        this.getIronmanList$.next(res);
        this.isLoading$.next(false);
      });
  }
}
