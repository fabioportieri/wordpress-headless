import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WordpressApiService {
  private siteUrl = 'http://192.168.1.157/demo.dmi';

  constructor(private http: HttpClient) {}

  getPosts() {
    const url = `${this.siteUrl}/wp-json/wp/v2/amm-trasparente`;
    console.log(url);
    return this.http.get(url).pipe(catchError(this.errorHandler));
  }

  getTipologie() {
    const url = `${this.siteUrl}/wp-json/wp/v2/tipologie?per_page=100&page=1`;
    console.log(url);
    return this.http.get(url).pipe(catchError(this.errorHandler));
  }

  getSinglePost(id: any) {
    const url = `${this.siteUrl}/wp-json/wp/v2/posts/${id}`;
    console.log(url);
    return this.http.get(url).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return new Observable((observer: Observer<any>) => {
      observer.error(error);
    });
  }
}
