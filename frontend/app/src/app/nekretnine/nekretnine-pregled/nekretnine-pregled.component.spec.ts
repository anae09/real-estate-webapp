import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NekretninePregledComponent } from './nekretnine-pregled.component';

describe('NekretninePregledComponent', () => {
  let component: NekretninePregledComponent;
  let fixture: ComponentFixture<NekretninePregledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NekretninePregledComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NekretninePregledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
