import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AuthApiService } from '../../services/auth-api.service';
import { Router } from '@angular/router';
import { STORAGE_KEYS } from 'src/app/main-page/chats-list/constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public isVisiblePassworde: boolean = false;
  public isVisibleUserName: boolean = false;
  public isVisibleButton: boolean = true;

  public wasUserNameTouched: boolean = false;
  public wasPasswordTouched: boolean = false;

  @ViewChild('userName') public userNameInput!: ElementRef<HTMLInputElement>;
  @ViewChild('password') public passwordInput!: ElementRef<HTMLInputElement>;

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
        Swal.fire('Registered successfully!');

        localStorage.setItem(STORAGE_KEYS.LOGGED_USER, userName);

        this.router.navigate(['/chats']);
      },
      error: (err) => {
        console.error('Error:', err);
        const serverMessage: string = err.error?.message || 'Unknown error';
        const status: number = err.status;
        const message: String = this.authService.checkTypeError(
          status,
          serverMessage
        );
        Swal.fire(`${message}`);
      },
    });
  }
}
