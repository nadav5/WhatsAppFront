import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat } from '../chats-list/type/chat.type';
import { User } from '../chats-list/type/user.type';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  public getUserByUserName(userName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${userName}`);
  }

  public getChatById(chatId: string): Observable<Chat> {
    return this.http.get<Chat>(`${this.baseUrl}/chats/${chatId}`);
  }
public getAvailableUsers(userName: string): Observable<User[]> {
  return this.http.get<User[]>(`${this.baseUrl}/users/available/${userName}`);
}


  public addContact(userName: string, contactUserName: string): Observable<any> {
  return this.http.put(`${this.baseUrl}/users/add-contact`, {
    userName,
    contactUserName,
  });
}

}
