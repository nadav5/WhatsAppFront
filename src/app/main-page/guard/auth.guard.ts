import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { STORAGE_KEYS } from '../chats-list/constants';
import { ApiService } from '../service/api.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private apiService: ApiService) {}

  canActivate(): Observable<boolean> {
    const token = localStorage.getItem(STORAGE_KEYS.LOGGED_USER);
    if (!token) {
      this.router.navigate(['/login']);
      return of(false);
    }

    return new Observable<boolean>((observer) => {
      this.apiService.getUserByUserName(token).subscribe({
        next: (u) => {
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
