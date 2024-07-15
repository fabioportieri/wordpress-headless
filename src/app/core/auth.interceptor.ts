import { HttpInterceptorFn } from '@angular/common/http';
import { JWT_KEY } from '../shared/app.constants';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = localStorage.getItem(JWT_KEY);

  const authReq = authToken
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      })
    : req;

  return next(authReq);
};
