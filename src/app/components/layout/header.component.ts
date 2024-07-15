import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { JWT_KEY } from '../../shared/app.constants';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'awp-header',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    OverlayModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  template: `
    <mat-toolbar>
      <button
        mat-icon-button
        class="example-icon"
        aria-label="Example icon-button with menu icon"
      >
        <mat-icon>menu</mat-icon>
      </button>
      <span class="toolbar-title">Wordpress Headless POC</span>

      <button
        mat-button
        class=""
        (click)="router.navigate(['/publish'])"
        aria-label="publish"
      >
        Create new...
      </button>
      <button
        (click)="router.navigate(['/search'])"
        mat-button
        class=""
        aria-label="search"
      >
        Search posts
      </button>
      <span class="example-spacer"></span>

      <button
        mat-icon-button
        (click)="isOpenLoginMenu = !isOpenLoginMenu"
        cdkOverlayOrigin
        #trigger="cdkOverlayOrigin"
        class="example-icon"
        aria-label="icon-button with account_circle icon"
      >
        <mat-icon>account_circle</mat-icon>
      </button>
    </mat-toolbar>

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="trigger"
      [cdkConnectedOverlayOpen]="isOpenLoginMenu"
      (backdropClick)="isOpenLoginMenu = false"
      hasBackdrop="true"
    >
      <div class="login-div">
        <form
          class="login-form"
          [formGroup]="loginForm"
          (ngSubmit)="onSubmit()"
        >
          <div>
            <mat-form-field appearance="outline" class="">
              <mat-label>Username</mat-label>
              <input matInput formControlName="username" />
            </mat-form-field>
          </div>
          <div>
            <mat-form-field class="" appearance="outline">
              <mat-label>Password</mat-label>
              <input matInput formControlName="password" />
            </mat-form-field>
          </div>
          <button
            type="submit"
            mat-flat-button
            color="primary"
            class=""
            aria-label="login"
          >
            Login
          </button>
        </form>
      </div>
    </ng-template>
  `,
  styles: `
    :host {
      display: block;
    }

    .login-div {
  // width: 100px;
  border: solid 1px #ccc;
  border-radius: 5px;
  background: #fff;
  text-align: center;
  padding: 10px;
  margin: 0;
}


    
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  isOpenLoginMenu = false;
  loginForm: FormGroup;
  public constructor(
    private storage: SessionStorageService,
    public router: Router,
    private fb: FormBuilder,
    public authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Handle form submission logic here
      const { username, password } = this.loginForm.value;
      console.log('Username:', username);
      console.log('Password:', password);
      // Perform the login action (e.g., API call)
      // ...
      this.authService.auth(username, password).subscribe((res) => {
        console.log('login res: ', res);
        this.storage.store(JWT_KEY, res.jwt_token);
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
