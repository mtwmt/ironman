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

  fetch7thIronman() {
    const url = `${this.baseUrl}/ironman7th.json`;
    return this.httpClient.get<IronmanListInfo[]>(url);
  }
  fetch8thIronman() {
    const url = `${this.baseUrl}/ironman8th.json`;
    return this.httpClient.get<IronmanListInfo[]>(url);
  }
  fetch9thIronman() {
    const url = `${this.baseUrl}/ironman9th.json`;
    return this.httpClient.get<IronmanListInfo[]>(url);
  }
  fetch10thIronman() {
    const url = `${this.baseUrl}/ironman10th.json`;
    return this.httpClient.get<IronmanListInfo[]>(url);
  }
  fetch11thIronman() {
    const url = `${this.baseUrl}/ironman11th.json`;
    return this.httpClient.get<IronmanListInfo[]>(url);
  }
  fetch12thIronman() {
    const url = `${this.baseUrl}/ironman12th.json`;
    return this.httpClient.get<IronmanListInfo[]>(url);
  }
  fetch13thIronman() {
    const url = `${this.baseUrl}/ironman13th.json`;
    return this.httpClient.get<IronmanListInfo[]>(url);
  }
  fetch14thIronman() {
    const url = `${this.baseUrl}/ironman14th.json`;
    return this.httpClient.get<IronmanListInfo[]>(url);
  }
}
