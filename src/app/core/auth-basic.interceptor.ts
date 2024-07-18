import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const authBasicInterceptor: HttpInterceptorFn = (req, next) => {
  const password = environment.wordpressSitePassword;

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Basic ${password}`,
    },
  });

  return next(authReq);
};
