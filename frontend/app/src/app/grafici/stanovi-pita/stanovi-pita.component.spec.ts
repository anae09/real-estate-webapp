import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StanoviPitaComponent } from './stanovi-pita.component';

describe('StanoviPitaComponent', () => {
  let component: StanoviPitaComponent;
  let fixture: ComponentFixture<StanoviPitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StanoviPitaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StanoviPitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
