import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IronmanListInfo } from './ironman.model';


@Injectable({
  providedIn: 'root',
})
export class IronmanService {
  readonly baseUrl = `${environment.baseUrl}/assets`;



  constructor(private httpClient: HttpClient) {}

  fetchIronman(year: string) {
    const url = `${this.baseUrl}/ironman${year}.json`;
    return this.httpClient.get<IronmanListInfo[]>(url);
  }

}
