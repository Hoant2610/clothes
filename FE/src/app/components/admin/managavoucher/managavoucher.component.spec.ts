import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagavoucherComponent } from './managavoucher.component';

describe('ManagavoucherComponent', () => {
  let component: ManagavoucherComponent;
  let fixture: ComponentFixture<ManagavoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagavoucherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagavoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
