import { Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './request.interceptor';
import { ResponseInterceptor } from './response.interceptor';

export const AppProviders: Provider[] = [
  { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
];
