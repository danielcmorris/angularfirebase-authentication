import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSquareComponent } from './edit-square.component';

describe('EditSquareComponent', () => {
  let component: EditSquareComponent;
  let fixture: ComponentFixture<EditSquareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSquareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
