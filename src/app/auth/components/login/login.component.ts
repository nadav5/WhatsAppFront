import {
  Component,
  ElementRef,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AuthApiService } from '../../services/auth-api.service';
import { Router } from '@angular/router';
import { STORAGE_KEYS } from 'src/app/main-page/chats-list/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isVisiblePassworde: boolean = false;
  isVisibleUserName: boolean = false;
  isVisibleButton: boolean = true;

  wasUserNameTouched: boolean = false;
  wasPasswordTouched: boolean = false;

  @ViewChild('userName') userNameInput!: ElementRef<HTMLInputElement>;
  @ViewChild('password') passwordInput!: ElementRef<HTMLInputElement>;

  constructor(
    private authService: AuthService,
    private authApiService: AuthApiService,
    private router: Router
  ) {}

  private updateButtonVisibility(): void {
    this.isVisibleButton = !(this.isVisiblePassworde && this.isVisibleUserName);
  }

  public checkPassword(password: string): void {
  this.wasPasswordTouched = true;
  this.isVisiblePassworde = this.authService.checkPassword(password);
  this.updateButtonVisibility();
}

public checkUserName(UserName: string): void {
  this.wasUserNameTouched = true;
  this.isVisibleUserName = this.authService.checkUserName(UserName);
  this.updateButtonVisibility();
}


  public onLogin(): void {
    const userName: string = this.userNameInput.nativeElement.value;
    const password: string = this.passwordInput.nativeElement.value;

    this.authApiService.login(userName, password).subscribe({
      next: (res) => {
        if (res.success) {
          if (res.user === userName) {
            console.log('Login successful for:', res.user);

            localStorage.setItem(STORAGE_KEYS.LOGGED_USER, res.user);
            alert('Welcome ' + res.user);
            this.router.navigate(['/chats']);
          } else {
            console.error('Username mismatch!');
            alert('Username mismatch');
          }
        } else {
          console.error('Login failed');
          alert('Invalid username or password');
        }
      },
      error: (err) => {
        console.error('Server error', err);
        alert('Server error');
      },
    });
  }
}
