import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { PostsComponent } from '../../components/posts/posts.component';
import {
  Tipologie,
  TipologieDropdownComponent,
} from '../../shared/tipologie-dropdown/tipologie-dropdown.component';
import { WordpressApiService } from '../../shared/wordpress-api.service';

@Component({
  selector: 'awp-search-posts-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    PostsComponent,
    TipologieDropdownComponent,
  ],
  template: `
    <div id="layout" class="pure-g">
      <div class="content pure-u-1 pure-u-md-3-4">
        <div>
          <div class="row">
            <!-- <button mat-flat-button>Login</button> -->
            <awp-tipologie-dropdown
              [tipologie]="tipologie"
            ></awp-tipologie-dropdown>
          </div>

          <div class="row">
            <awp-posts></awp-posts>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .row {
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPostsPageComponent implements OnInit {
  tipologie: Tipologie[] = [];

  constructor(
    private wordpressApiService: WordpressApiService,
    private cd: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.wordpressApiService.getTipologie().subscribe((res) => {
      this.tipologie = res;
      console.log('tipo:', this.tipologie);
      this.cd.detectChanges();
    });
  }
}
