import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public checkPhoneNumber(phoneNumber: string): boolean{
    return /^05\d{8}$/.test(phoneNumber); 
  }

  public checkPassword(password: string): boolean{
    if(password.length> 5 && password.length < 12){
      return true;
    }else{
      return false;
    }
  }
  public checkUserName(UserName: string): boolean{
    return UserName.length >= 4 && UserName.length <= 10;
  }

  private updateButtonVisibilityLogin(isVisiblePassworde: boolean,isVisiblePhoneNumber: boolean): boolean {
    return  !(isVisiblePassworde && isVisiblePhoneNumber);
  }

  public checkTypeError(status: number,serverMessage: string ):string{
    if (status === 409) {
      return('Username already exists!');
    } else if (status === 404) {
      return('User not found!');
    } else if (status === 400) {
      return('Bad request! Check your input.');
    } else {
      return('Registration failed: ' + serverMessage);
    }
  }
}
