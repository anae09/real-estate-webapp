import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrojNekretninaPoGraduComponent } from './broj-nekretnina-po-gradu.component';

describe('BrojNekretninaPoGraduComponent', () => {
  let component: BrojNekretninaPoGraduComponent;
  let fixture: ComponentFixture<BrojNekretninaPoGraduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrojNekretninaPoGraduComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrojNekretninaPoGraduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
