import { TestBed } from '@angular/core/testing';

import { ProcenatService } from './procenat.service';

describe('ProcenatService', () => {
  let service: ProcenatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcenatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
