import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-isbn',
  templateUrl: './isbn.component.html',
})
export class IsbnComponent implements OnInit {
  availableDevices!: MediaDeviceInfo[];
  selectedDevice!: MediaDeviceInfo;
  hasDevices!: boolean;
  hasPermission!: boolean;
  formatsEnabled = [BarcodeFormat.EAN_13];
  isbn!: string;
  bookInfo!: any;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {}

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
    if (this.hasDevices) {
      this.selectedDevice = devices[0];
    }
  }

  onScanSuccess(result: string): void {
    console.log('onScanSuccess', result);
    this.isbn = result;
    this.fetchBookInfo(result);
  }

  onHasPermission(has: boolean): void {
    this.hasPermission = has;
  }

  fetchBookInfo(isbn: string): void {
    this.getBookByISBN(isbn).subscribe(
      (data: any) => {
        if (data.totalItems > 0) {
          this.bookInfo = data.items[0].volumeInfo;
          console.log('Book Info:', this.bookInfo);
          // 你可以在這裡將書籍資訊顯示在前端或進行其他操作
        } else {
          console.log('未找到對應的書籍資料');
        }
      },
      (error: any) => {
        console.error('獲取書籍資料時出錯:', error);
      }
    );
  }

  getBookByISBN(isbn: string): Observable<any> {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
    return this.http.get(apiUrl).pipe(
      tap((res) => {
        console.log('aaa', res);
      })
    );
  }
}