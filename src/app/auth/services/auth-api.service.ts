import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private baseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  register(userName: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}`, { userName, password });
  }

  login(userName: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { userName, password });
  }
}
