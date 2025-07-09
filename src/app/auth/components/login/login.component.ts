import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isVisiblePassworde: boolean = false;    
  isVisiblePhoneNumber: boolean = false;
  

  isVisibleButton: boolean = true;
  constructor(private authService: AuthService){}

  private updateButtonVisibility(): void {
    this.isVisibleButton = !(this.isVisiblePassworde && this.isVisiblePhoneNumber);
  }

  public checkPassword(password: string): void{
    this.isVisiblePassworde = this.authService.checkPassword(password);
    this.updateButtonVisibility();

  }

  public checkPhoneNumber(phoneNumber: string): void{
    this.isVisiblePhoneNumber = this.authService.checkPhoneNumber(phoneNumber);
    this.updateButtonVisibility();
  }

  public onSubmit(): void {
    console.log('Form submitted:');
  }
}
