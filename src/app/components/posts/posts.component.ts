import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { WordpressApiService } from '../../shared/wordpress-api.service';

@Component({
  selector: 'awp-posts',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div id="layout" class="pure-g">
      <div class="content pure-u-1 pure-u-md-3-4">
        <div>
          <!-- A wrapper for all the blog posts -->
          <div class="posts">
            <h1 class="content-subhead">Blog Posts</h1>
            <span style="color: red">{{ errorMessage }}</span>
            <!-- A single blog post -->
            <section class="post" *ngFor="let post of blogPosts">
              <header class="post-header">
                <h2 class="post-title" [innerHTML]="post.title.rendered"></h2>
                <p class="post-meta">
                  By
                  <a
                    href="http://192.168.1.157/demo.dmi/wp-login.php"
                    target="_blank"
                    class="post-author"
                    >Dmi</a
                  >
                  Date
                  <a routerLink="/posts">{{ post.date | date : 'short' }}</a>
                </p>
              </header>

              <div class="post-description">
                <p [innerHTML]="post.excerpt.rendered | slice : 0 : 400"></p>
                <!-- [routerLink]="['/posts', post.id]" -->
                <a class="button button1"> Read More </a>
              </div>
            </section>
          </div>

          <div class="footer">
            <div class="pure-menu pure-menu-horizontal">
              <div class="pure-menu-item">
                <a
                  href="http://192.168.1.157/demo.dmi/wp-login.php"
                  class="pure-menu-link"
                  >dmi demo</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    * {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

a {
  text-decoration: none;
  color: rgb(61, 146, 201);
}
a:hover,
a:focus {
  text-decoration: underline;
}

h3 {
  font-weight: 100;
}


.pure-img-responsive {
  max-width: 100%;
  height: auto;
}

#layout {
  padding: 0;
}

.header {
  text-align: center;
  top: auto;
  margin: 3em auto;
}


.brand-title,
.brand-tagline {
  margin: 0;
}
.brand-title {
  text-transform: uppercase;
}
.brand-tagline {
  font-weight: 300;
  color: rgb(176, 202, 219);
}

.nav-list {
  margin: 0;
  padding: 0;
  list-style: none;
}
.nav-item {
  display: inline-block;
  *display: inline;
  zoom: 1;
}
.nav-item a {
  background: transparent;
  border: 2px solid rgb(176, 202, 219);
  color: #fff;
  margin-top: 1em;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-size: 85%;
}
.nav-item a:hover,
.nav-item a:focus {
  border: 2px solid rgb(61, 146, 201);
  text-decoration: none;
}

.content-subhead {
  text-transform: uppercase;
  color: #aaa;
  border-bottom: 1px solid #eee;
  padding: 0.4em 0;
  font-size: 80%;
  font-weight: 500;
  letter-spacing: 0.1em;
}

.content {
  padding: 2em 1em 0;
}

.post {
  padding-bottom: 2em;
}
.post-title {
  font-size: 2em;
  color: #222;
  margin-bottom: 0.2em;
}
.post-logo {
  border-radius: 0px;
  float: right;
  margin-left: 1em;
  margin-bottom: 1.6em;
}
.post-description {
  font-family: Georgia, "Cambria", serif;
  color: #444;
  line-height: 1.8em;
}
.post-meta {
  color: #999;
  font-size: 90%;
  margin: 0;
}

.post-category {
  margin: 0 0.1em;
  padding: 0.3em 1em;
  color: #fff;
  background: #999;
  font-size: 80%;
}

  .post-category-js {
      background: #F0DB4F;
  }

.post-images {
  margin: 1em 0;
}


.footer {
  padding: 1em 0;
}
.footer a {
  color: #ccc;
  font-size: 80%;
}
.footer .pure-menu a:hover,
.footer .pure-menu a:focus {
  background: none;
}

.button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
}

.a:hover {
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
}

@media (min-width: 48em) {
  .content {
      padding: 2em 3em 0;
      margin: 0 25% 0 25%;
  }

  .header {
      margin: 80% 2em 0;
      text-align: right;
  }

 
  .footer {
      text-align: center;
  }
}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent implements OnInit {
  blogPosts: any;
  id!: string;
  errorMessage: any;
  constructor(
    private wordpressApiService: WordpressApiService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    // this.spinner.show();

    this.wordpressApiService.getPosts().subscribe(
      (data) => {
        this.blogPosts = data;
        console.log(this.blogPosts);
        // this.spinner.hide();
        this.cd.detectChanges();
      },
      (error) => {
        // if any error, Code throws the error
        this.errorMessage = error.error.message;
        console.log(error.error.message, 'error');
        // this.spinner.hide();
      }
    );
  }
}