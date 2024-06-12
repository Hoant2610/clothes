import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerclothesdetailComponent } from './customerclothesdetail.component';

describe('CustomerclothesdetailComponent', () => {
  let component: CustomerclothesdetailComponent;
  let fixture: ComponentFixture<CustomerclothesdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerclothesdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerclothesdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
