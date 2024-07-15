import { HttpErrorResponse } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

export function errorHandler(error: HttpErrorResponse) {
  return new Observable((observer: Observer<any>) => {
    observer.error(error);
  });
}
