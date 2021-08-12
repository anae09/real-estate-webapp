import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KorisniciTabelaComponent } from './korisnici-tabela.component';

describe('KorisniciTabelaComponent', () => {
  let component: KorisniciTabelaComponent;
  let fixture: ComponentFixture<KorisniciTabelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KorisniciTabelaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KorisniciTabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
