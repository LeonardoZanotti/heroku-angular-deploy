import { TestBed } from '@angular/core/testing';

import { HeroCompanyService } from './hero-company.service';

describe('HeroCompanyService', () => {
  let service: HeroCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
