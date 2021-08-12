import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderGostComponent } from './header-gost.component';

describe('HeaderGostComponent', () => {
  let component: HeaderGostComponent;
  let fixture: ComponentFixture<HeaderGostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderGostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderGostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
