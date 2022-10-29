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
} from 'rxjs';
import { IronmanListInfo } from './ironman.model';
import { IronmanService } from './ironman.service';

@Injectable({
  providedIn: 'root',
})
export class IronmanStoreService {
  public ironman2022$: Observable<IronmanListInfo[]> = this.ironmanService
    .fetch2022Ironman()
    .pipe(shareReplay(1));
  public ironman2021$: Observable<IronmanListInfo[]> = this.ironmanService
    .fetch2021Ironman()
    .pipe(shareReplay(1));
  public ironman2020$: Observable<IronmanListInfo[]> = this.ironmanService
    .fetch2020Ironman()
    .pipe(shareReplay(1));
  public ironman2019$: Observable<IronmanListInfo[]> = this.ironmanService
    .fetch2019Ironman()
    .pipe(shareReplay(1));
  public ironman2018$: Observable<IronmanListInfo[]> = this.ironmanService
    .fetch2018Ironman()
    .pipe(shareReplay(1));
  public ironman2017$: Observable<IronmanListInfo[]> = this.ironmanService
    .fetch2017Ironman()
    .pipe(shareReplay(1));
  // public ironman2016$: Observable<IronmanListInfo[]> = this.ironmanService
  //   .fetch2016Ironman()
  //   .pipe(shareReplay(1));
  // public ironman2015$: Observable<IronmanListInfo[]> = this.ironmanService
  //   .fetch2015Ironman()
  //   .pipe(shareReplay(1));
  public ironman2014$: Observable<IronmanListInfo[]> = this.ironmanService
    .fetch2014Ironman()
    .pipe(shareReplay(1));
  public ironmanHistory$: Observable<IronmanListInfo[]> = this.ironmanService
    .fetchHistoryIronman()
    .pipe(shareReplay(1));

  public getIronmanList$: BehaviorSubject<IronmanListInfo[]> =
    new BehaviorSubject([] as IronmanListInfo[]);

  constructor(private ironmanService: IronmanService) {}

  filterYearObservable(year: string = '') {
    return combineLatest([
      this.ironman2022$,
      this.ironman2021$,
      this.ironman2020$,
      this.ironman2019$,
      this.ironman2018$,
      this.ironman2017$,
      // this.ironman2016$,
      // this.ironman2015$,
      this.ironman2014$,
      this.ironmanHistory$,
    ]).pipe(
      map(
        ([
          i2022,
          i2021,
          i2020,
          i2019,
          i2018,
          i2017,
          // i2016,
          // i2015,
          i2014,
          iHistory,
        ]) => {
          let list: IronmanListInfo[] = [];
          switch (year) {
            case '2022':
              list = i2022;
              break;
            case '2021':
              list = i2021;
              break;
            case '2020':
              list = i2020;
              break;
            case '2019':
              list = i2019;
              break;
            case '2018':
              list = i2018;
              break;
            case '2017':
              list = i2017;
              break;
            // case '2016':
            //   list = i2016;
            //   break;
            // case '2015':
            //   list = i2015;
            //   break;
            case '2014':
              list = i2014;
              break;
            case 'history':
              list = iHistory;
              break;
            default:
              list = [
                ...i2022,
                ...i2021,
                ...i2020,
                ...i2019,
                ...i2018,
                ...i2017,
                // ...i2016,
                // ...i2015,
                ...i2014,
                ...iHistory,
              ];
              break;
          }
          return list;
        }
      )
    );
  }

  filterCategory(year: string = '', category: string = '') {
    return this.filterYearObservable(year).pipe(
      map((list) => {
        return list.filter((d: IronmanListInfo) => {
          return d.category
            .toLocaleLowerCase()
            .includes(category.toLocaleLowerCase());
        });
      })
    );
  }

  filterQuery(query: string, year: string = '', category: string = '') {
    of(query)
      .pipe(
        debounceTime(700),
        switchMap((val) => {
          return this.filterCategory(year, category).pipe(
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
      });
  }
}
