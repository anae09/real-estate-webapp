import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KucePitaComponent } from './kuce-pita.component';

describe('KucePitaComponent', () => {
  let component: KucePitaComponent;
  let fixture: ComponentFixture<KucePitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KucePitaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KucePitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
