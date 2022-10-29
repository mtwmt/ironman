import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IronmanComponent } from './ironman.component';

describe('IronmanComponent', () => {
  let component: IronmanComponent;
  let fixture: ComponentFixture<IronmanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IronmanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IronmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
