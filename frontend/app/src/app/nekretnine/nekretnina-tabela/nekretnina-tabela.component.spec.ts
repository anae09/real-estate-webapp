import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NekretninaTabelaComponent } from './nekretnina-tabela.component';

describe('NekretninaTabelaComponent', () => {
  let component: NekretninaTabelaComponent;
  let fixture: ComponentFixture<NekretninaTabelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NekretninaTabelaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NekretninaTabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
