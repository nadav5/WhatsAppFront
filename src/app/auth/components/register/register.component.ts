import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  isVisiblePassworde: boolean = false;
  isVisiblePhoneNumber: boolean = false;
  isVisibleUserName: boolean = false;

  isVisibleButton: boolean = true;

  constructor(private authService: AuthService) {}

  private updateButtonVisibility(): void {
    this.isVisibleButton = !(
      this.isVisiblePassworde &&
      this.isVisiblePhoneNumber &&
      this.isVisibleUserName
    );
  }

  public checkPassword(password: string): void {
    this.isVisiblePassworde = this.authService.checkPassword(password);
    this.updateButtonVisibility();
  }

  public checkPhoneNumber(phoneNumber: string): void {
    this.isVisiblePhoneNumber = this.authService.checkPhoneNumber(phoneNumber);
    this.updateButtonVisibility();
  }

  public checkUserName(UserName: string): void {
    this.isVisibleUserName = this.authService.checkUserName(UserName);
    this.updateButtonVisibility();
  }
  public onSubmit(): void {}
}
