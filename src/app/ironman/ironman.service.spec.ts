import { TestBed } from '@angular/core/testing';

import { IronmanService } from './ironman.service';

describe('IronmanService', () => {
  let service: IronmanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IronmanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
