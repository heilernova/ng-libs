import { TestBed } from '@angular/core/testing';

import { NgNovaService } from './ng-nova.service';

describe('NgNovaService', () => {
  let service: NgNovaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgNovaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
