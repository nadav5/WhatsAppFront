import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/main-page/chats-list/type/user.type';
import { UserRO } from 'src/app/main-page/chats-list/type/user.ro';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private baseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  public register(userName: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}`, { userName, password });
  }

  public login(userName: string, password: string): Observable<UserRO> {
    return this.http.post<UserRO>(`${this.baseUrl}/login`, { userName, password });
  }
}
