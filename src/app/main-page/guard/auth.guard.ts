import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { STORAGE_KEYS } from '../chats-list/constants';
import { ApiService } from '../service/api.service';
import { Observable, of } from 'rxjs';
import { User } from '../chats-list/type/user.type';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private apiService: ApiService) {}

  public canActivate(): Observable<boolean> {
    const token : string | null = localStorage.getItem(STORAGE_KEYS.LOGGED_USER);
    if (!token) {
      this.router.navigate(['/login']);
      return of(false);
    }

    return new Observable<boolean>((observer) => {
      this.apiService.getUserByUserName(token).subscribe({
        next: (u: User) => {
          observer.next(true);
          observer.complete();
        },
        error: (err) => {
          this.router.navigate(['/login']);
          observer.next(false);
          observer.complete();
        },
      });
    });
  }
}
