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

  fetchHistoryIronman() {
    const url = `${this.baseUrl}/ironman.json`;
    return this.httpClient.get<IronmanListInfo[]>(url);
  }

  fetch2014Ironman() {
    const url = `${this.baseUrl}/ironman2014.json`;
    return this.httpClient.get<IronmanListInfo[]>(url);
  }

  fetch2015Ironman() {
    const url = `${this.baseUrl}/ironman2015.json`;
    return this.httpClient.get<IronmanListInfo[]>(url);
  }

  fetch2016Ironman() {
    const url = `${this.baseUrl}/ironman2016.json`;
    return this.httpClient.get<IronmanListInfo[]>(url);
  }
  fetch2017Ironman() {
    const url = `${this.baseUrl}/ironman2017.json`;
    return this.httpClient.get<IronmanListInfo[]>(url);
  }
  fetch2018Ironman() {
    const url = `${this.baseUrl}/ironman2018.json`;
    return this.httpClient.get<IronmanListInfo[]>(url);
  }
  fetch2019Ironman() {
    const url = `${this.baseUrl}/ironman2019.json`;
    return this.httpClient.get<IronmanListInfo[]>(url);
  }
  fetch2020Ironman() {
    const url = `${this.baseUrl}/ironman2020.json`;
    return this.httpClient.get<IronmanListInfo[]>(url);
  }
  fetch2021Ironman() {
    const url = `${this.baseUrl}/ironman2021.json`;
    return this.httpClient.get<IronmanListInfo[]>(url);
  }
  fetch2022Ironman() {
    const url = `${this.baseUrl}/ironman2022.json`;
    return this.httpClient.get<IronmanListInfo[]>(url);
  }
}
