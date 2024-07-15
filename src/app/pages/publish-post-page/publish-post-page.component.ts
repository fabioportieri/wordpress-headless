import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { CustomCkeditorComponent } from '../../shared/custom-ckeditor/custom-ckeditor.component';
import { WordpressApiService } from '../../shared/wordpress-api.service';

@Component({
  selector: 'awp-publish-post-page',
  standalone: true,
  imports: [
    CommonModule,
    CustomCkeditorComponent,
    MatButtonModule,
    MatToolbarModule,
  ],
  template: `
    <mat-toolbar>
      <span class="">Amm. Trasparente - Create new Article</span>

      <span class="example-spacer"></span>
      <button mat-flat-button class="" (click)="publish()" aria-label="publish">
        Publish
      </button>
    </mat-toolbar>
    <div class="container"><awp-ckeditor></awp-ckeditor></div>

    <button
      class="button"
      (click)="publish()"
      mat-flat-button
      class=""
      aria-label="publish"
    >
      publish
    </button>
  `,
  styles: [
    `
      .container {
      }
      .mdc-button {
        margin-top: 30px;
        margin-bottom: 30px;
      }
      :host {
        display: block;
        text-align: center;
      }
    `,
  ],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublishPostPageComponent implements OnInit {
  public constructor(
    private router: Router,
    private wordpressApiService: WordpressApiService
  ) {}
  ngOnInit(): void {
    true;
  }

  publish(): void {
    this.wordpressApiService
      .createPostForTipology([1])
      .pipe()
      .subscribe((res) => {
        console.log('published! ', res);
        this.router.navigate(['/search']);
      });
  }
}
