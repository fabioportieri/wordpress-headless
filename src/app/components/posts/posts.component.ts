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
    <!-- A wrapper for all the blog posts -->
    <div class="posts">
      <div class="content-subhead">Amm. Trasparente Posts</div>
      <span style="color: red">{{ errorMessage }}</span>
      <!-- A single blog post -->
      <section class="post" *ngFor="let post of ammTrasparentePosts">
        <header class="post-header">
          <h4 class="post-title" [innerHTML]="post.title.rendered"></h4>
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
  `,
  styles: `
    :host {
      display: block;
    }

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent implements OnInit {
  ammTrasparentePosts: any;
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
        this.ammTrasparentePosts = data;
        console.log(this.ammTrasparentePosts);
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
