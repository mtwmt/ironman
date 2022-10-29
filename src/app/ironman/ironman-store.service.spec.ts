import { TestBed } from '@angular/core/testing';

import { IronmanStoreService } from './ironman-store.service';

describe('IronmanStoreService', () => {
  let service: IronmanStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IronmanStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
