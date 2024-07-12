import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { PostsComponent } from '../../components/posts/posts.component';
@Component({
  selector: 'awp-main',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    PostsComponent,
  ],
  template: `
    <div class="row">
      <!-- <button mat-flat-button>Login</button> -->
    </div>

    <div class="row">
      <awp-posts></awp-posts>
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
export class MainComponent {}
