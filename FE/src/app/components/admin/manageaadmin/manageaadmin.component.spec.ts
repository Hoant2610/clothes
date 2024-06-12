import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageaadminComponent } from './manageaadmin.component';

describe('ManageaadminComponent', () => {
  let component: ManageaadminComponent;
  let fixture: ComponentFixture<ManageaadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageaadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageaadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
