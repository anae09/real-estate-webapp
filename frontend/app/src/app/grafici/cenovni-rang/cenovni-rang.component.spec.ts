import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenovniRangComponent } from './cenovni-rang.component';

describe('CenovniRangComponent', () => {
  let component: CenovniRangComponent;
  let fixture: ComponentFixture<CenovniRangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CenovniRangComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CenovniRangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
