import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from '../../environments/environment';
import { errorHandler } from './misc-utils';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private siteUrl = environment.wordpressSiteUrl; // 'http://192.168.1.157/demo.dmi';

  constructor(
    private http: HttpClient // private storage: SessionStorageService
  ) {}

  auth(username: string, password: string) {
    const url = `${this.siteUrl}/wp-json/api/v1/token`;
    const body = { username, password };
    // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, body).pipe(catchError(errorHandler));
  }
  // this.storage.store('boundValue', this.attribute);
}
