import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsizeComponent } from './editsize.component';

describe('EditsizeComponent', () => {
  let component: EditsizeComponent;
  let fixture: ComponentFixture<EditsizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditsizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditsizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
