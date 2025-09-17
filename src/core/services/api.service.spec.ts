// src/app/core/services/api.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let store: { [key: string]: string };

  beforeEach(() => {
    store = {};
    spyOn(sessionStorage, 'getItem').and.callFake((key: string) => store[key] || null);
    spyOn(sessionStorage, 'setItem').and.callFake(
      (key: string, value: string) => (store[key] = value)
    );
    spyOn(sessionStorage, 'removeItem').and.callFake((key: string) => delete store[key]);

    TestBed.configureTestingModule({
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
  });

  it('should store user in sessionStorage on login', (done) => {
    service.login('admin@example.com', 'password').subscribe((user) => {
      expect(sessionStorage.setItem).toHaveBeenCalledWith('currentUser', JSON.stringify(user));
      done();
    });
  });

  it('should remove user from sessionStorage on logout', (done) => {
    service.logout().subscribe(() => {
      expect(sessionStorage.removeItem).toHaveBeenCalledWith('currentUser');
      done();
    });
  });
});
