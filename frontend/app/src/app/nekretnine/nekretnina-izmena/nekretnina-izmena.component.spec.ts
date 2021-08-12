import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NekretninaIzmenaComponent } from './nekretnina-izmena.component';

describe('NekretninaIzmenaComponent', () => {
  let component: NekretninaIzmenaComponent;
  let fixture: ComponentFixture<NekretninaIzmenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NekretninaIzmenaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NekretninaIzmenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
