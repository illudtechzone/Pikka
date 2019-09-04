import { TestBed } from '@angular/core/testing';

import { JhiWebSocketService } from './jhi-web-socket.service';

describe('JhiWebSocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JhiWebSocketService = TestBed.get(JhiWebSocketService);
    expect(service).toBeTruthy();
  });
});
