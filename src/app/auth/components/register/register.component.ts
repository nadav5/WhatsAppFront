import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AuthApiService } from '../../services/auth-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  isVisiblePassworde: boolean = false;
  isVisibleUserName: boolean = false;
  isVisibleButton: boolean = true;

  wasUserNameTouched: boolean = false;
  wasPasswordTouched: boolean = false;

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
  this.wasPasswordTouched = true;
  this.isVisiblePassworde = this.authService.checkPassword(password);
  this.updateButtonVisibility();
}

public checkUserName(userName: string): void {
  this.wasUserNameTouched = true;
  this.isVisibleUserName = this.authService.checkUserName(userName);
  this.updateButtonVisibility();
}

  public onSubmit(): void {
    const userName = this.userNameInput.nativeElement.value;
    const password = this.passwordInput.nativeElement.value;

    this.authApiService.register(userName, password).subscribe({
      next: (res) => {
        console.log('Registered!', res);
        alert('Registered successfully!');
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
