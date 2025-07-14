import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getUserByUserName(userName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${userName}`);
  }
}
