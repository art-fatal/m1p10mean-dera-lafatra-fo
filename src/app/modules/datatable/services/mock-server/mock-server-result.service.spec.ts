import { TestBed } from '@angular/core/testing';

import { MockServerResultService } from './mock-server-result.service';

describe('MockServerResultService', () => {
  let service: MockServerResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockServerResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
