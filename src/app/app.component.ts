import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/layout/header.component';

@Component({
  selector: 'awp-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <awp-header></awp-header>
    <div class="wrapper"><router-outlet /></div>
    <div class="footer"></div>
  `,
  styles: [
    `
      .wrapper {
        margin: 0 auto;
        max-width: 1500px;
      }
    `,
  ],
})
export class AppComponent {
  title = 'wordpress-headless';
}
