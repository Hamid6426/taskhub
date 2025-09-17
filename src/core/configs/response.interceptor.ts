import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      delay(300), // simulate network latency
      catchError((error: HttpErrorResponse) => {
        console.error('Simulated network error:', error.message);
        return throwError(() => new Error('Network error occurred. Please retry.'));
      })
    );
  }
}
