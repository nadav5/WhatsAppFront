import { Component, ElementRef, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AuthApiService } from '../../services/auth-api.service';

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
    private authApiService: AuthApiService
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
    const userName = this.userNameInput.nativeElement.value;
    const password = this.passwordInput.nativeElement.value;

    this.authApiService.login(userName, password).subscribe({
      next: (res) => {
        console.log('Login!', res);
        alert('Login successfully!');
      },
      error: (err) => {
        console.error('Error:', err);
        const serverMessage: string = err.error?.message || 'Unknown error';
        const status: number = err.status;
        const message: String = this.authService.checkTypeError(
          status,
          serverMessage
        );
        alert(message);
      },
    });
  }
}
