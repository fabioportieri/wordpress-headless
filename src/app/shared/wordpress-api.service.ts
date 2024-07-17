import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { errorHandler } from './misc-utils';
@Injectable({
  providedIn: 'root',
})
export class WordpressApiService {
  private siteUrl = environment.wordpressSiteUrl;

  constructor(private http: HttpClient) {}

  getPosts() {
    const url = `${this.siteUrl}/wp-json/wp/v2/amm-trasparente`;
    console.log(url);
    return this.http.get(url).pipe(catchError(errorHandler));
  }

  getTipologie() {
    const url = `${this.siteUrl}/wp-json/wp/v2/tipologie?per_page=100&page=1`;
    console.log(url);
    return this.http.get(url).pipe(catchError(errorHandler));
  }

  getSinglePost(id: any) {
    const url = `${this.siteUrl}/wp-json/wp/v2/posts/${id}`;
    console.log(url);
    return this.http.get(url).pipe(catchError(errorHandler));
  }

  createPostForTipology(idsTipology: number[]) {
    const url = `${this.siteUrl}/wp-json/wp/v2/amm-trasparente`;
    const body = {
      title: {
        raw: 'Your Title',
      },
      content: {
        raw: 'Your content here',
      },
      status: 'publish',
      tipologie: [571, 572],
    };

    console.log(url);
    return this.http.post(url, body).pipe(catchError(errorHandler));
  }
}
