import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatesizeComponent } from './createsize.component';

describe('CreatesizeComponent', () => {
  let component: CreatesizeComponent;
  let fixture: ComponentFixture<CreatesizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatesizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatesizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
