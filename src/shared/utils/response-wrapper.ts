import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiResponse } from '../../core/models/api-response.model';

export function wrapResponse<T>(
  observable: Observable<T>,
  successMessage: string
): Observable<ApiResponse<T>> {
  return observable.pipe(
    map((data) => ({
      code: 200,
      message: successMessage,
      response: data,
    })),
    catchError((error) =>
      of({
        code: error.status || 500,
        message: error.message || 'An error occurred',
        response: null,
      })
    )
  );
}
