import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpropertyComponent } from './editproperty.component';

describe('EditpropertyComponent', () => {
  let component: EditpropertyComponent;
  let fixture: ComponentFixture<EditpropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditpropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
