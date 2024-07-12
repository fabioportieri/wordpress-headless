import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'awp-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <h2>Welcome to {{ title }}</h2>

    <router-outlet />
  `,
  styles: [
    `
      h2 {
        text-align: center;
      }
    `,
  ],
})
export class AppComponent {
  title = 'wordpress-headless';
}
