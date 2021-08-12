import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderKorisnikComponent } from './header-korisnik.component';

describe('HeaderKorisnikComponent', () => {
  let component: HeaderKorisnikComponent;
  let fixture: ComponentFixture<HeaderKorisnikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderKorisnikComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderKorisnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
