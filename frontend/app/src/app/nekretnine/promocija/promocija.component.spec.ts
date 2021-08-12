import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocijaComponent } from './promocija.component';

describe('PromocijaComponent', () => {
  let component: PromocijaComponent;
  let fixture: ComponentFixture<PromocijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromocijaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromocijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
