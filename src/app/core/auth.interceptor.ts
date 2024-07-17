import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { JWT_KEY } from '../shared/app.constants';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storage = inject(SessionStorageService);
  const authToken = storage.retrieve(JWT_KEY);
  console.log('RETRIEVED TOKNE ', authToken);
  const authReq = authToken
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      })
    : req;

  return next(authReq);
};
