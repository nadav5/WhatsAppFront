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
        alert('Registration failed: ' + err.message);
      },
    });
  }
}
