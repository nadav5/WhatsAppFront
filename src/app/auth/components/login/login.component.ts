import { Component, ElementRef, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AuthApiService } from '../../services/auth-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isVisiblePassworde: boolean = false;
  isVisibleUserName: boolean = false;
  isVisibleButton: boolean = true;

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
    this.isVisiblePassworde = this.authService.checkPassword(password);
    this.updateButtonVisibility();
  }

  public checkUserName(UserName: string): void {
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

        localStorage.setItem('loggedUser', res.user);
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
  }
});


  }
}
