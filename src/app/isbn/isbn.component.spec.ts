import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsbnComponent } from './isbn.component';

describe('IsbnComponent', () => {
  let component: IsbnComponent;
  let fixture: ComponentFixture<IsbnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IsbnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IsbnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
