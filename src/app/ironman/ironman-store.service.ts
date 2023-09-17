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

  public ironman15th$: Observable<IronmanListInfo[]> = this.ironmanService
    .fetch15thIronman()
    .pipe(shareReplay(1));
  public ironman14th$: Observable<IronmanListInfo[]> = this.ironmanService
    .fetch14thIronman()
    .pipe(shareReplay(1));
  public ironman13th$: Observable<IronmanListInfo[]> = this.ironmanService
    .fetch13thIronman()
    .pipe(shareReplay(1));
  public ironman12th$: Observable<IronmanListInfo[]> = this.ironmanService
    .fetch12thIronman()
    .pipe(shareReplay(1));
  public ironman11th$: Observable<IronmanListInfo[]> = this.ironmanService
    .fetch11thIronman()
    .pipe(shareReplay(1));
  public ironman10th$: Observable<IronmanListInfo[]> = this.ironmanService
    .fetch10thIronman()
    .pipe(shareReplay(1));
  public ironman9th$: Observable<IronmanListInfo[]> = this.ironmanService
    .fetch9thIronman()
    .pipe(shareReplay(1));
  public ironman8th$: Observable<IronmanListInfo[]> = this.ironmanService
    .fetch8thIronman()
    .pipe(shareReplay(1));
  public ironman7th$: Observable<IronmanListInfo[]> = this.ironmanService
    .fetch7thIronman()
    .pipe(shareReplay(1));
  public ironmanHistory$: Observable<IronmanListInfo[]> = this.ironmanService
    .fetchHistoryIronman()
    .pipe(shareReplay(1));

  public getIronmanList$: BehaviorSubject<IronmanListInfo[]> =
    new BehaviorSubject([] as IronmanListInfo[]);

  constructor(private ironmanService: IronmanService) {}

  filterNthObservable(th: string = '') {
    return combineLatest([
      this.ironman15th$,
      this.ironman14th$,
      this.ironman13th$,
      this.ironman12th$,
      this.ironman11th$,
      this.ironman10th$,
      this.ironman9th$,
      this.ironman8th$,
      this.ironman7th$,
      this.ironmanHistory$,
    ]).pipe(
      tap(() => this.isLoading$.next(true)),
      map(([th15, th14, th13, th12, th11, th10, th9, th8, th7, history]) => {
        let list: IronmanListInfo[] = [];
        switch (th) {
          case NthKey.Th15:
            list = th15;
            break;
          case NthKey.Th14:
            list = th14;
            break;
          case NthKey.Th13:
            list = th13;
            break;
          case NthKey.Th12:
            list = th12;
            break;
          case NthKey.Th11:
            list = th11;
            break;
          case NthKey.Th10:
            list = th10;
            break;
          case NthKey.Th9:
            list = th9;
            break;
          case NthKey.Th8:
            list = th8;
            break;
          case NthKey.Th7:
            list = th7;
            break;
          case NthKey.History:
            list = history;
            break;
          default:
            list = [
              ...th15,
              ...th14,
              ...th13,
              ...th12,
              ...th11,
              ...th10,
              ...th9,
              ...th8,
              ...th7,
              ...history,
            ];
            break;
        }
        return list;
      })
    );
  }

  filterCategory(th: string = '', category: string = '') {
    return this.filterNthObservable(th).pipe(
      tap(() => this.isLoading$.next(true)),
      map((list) => {
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
