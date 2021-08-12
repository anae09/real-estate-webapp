import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzmeniSifruComponent } from './izmeni-sifru.component';

describe('IzmeniSifruComponent', () => {
  let component: IzmeniSifruComponent;
  let fixture: ComponentFixture<IzmeniSifruComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IzmeniSifruComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IzmeniSifruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
