import { TestBed } from '@angular/core/testing';

import { MatthewyknowlesRestService } from './matthewyknowles-rest.service';

describe('MatthewyknowlesRestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MatthewyknowlesRestService = TestBed.get(MatthewyknowlesRestService);
    expect(service).toBeTruthy();
  });
});
