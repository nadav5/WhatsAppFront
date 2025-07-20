
import { Observable } from 'rxjs';
import { Chat } from '../../type/chat.type';
import { User } from '../../type/user.type';
import { ApiService } from 'src/app/main-page/service/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatsListService {
  constructor(private apiService: ApiService) {}

  public getUserByUserName(userName: string): Observable<User> {
    return this.apiService.getUserByUserName(userName);
  }

  public getAvailableUsers(userName: string): Observable<User[]> {
    return this.apiService.getAvailableUsers(userName);
  }

  public createGroup(name: string, description: string, members: string[]): Observable<Chat> {
    return this.apiService.createGroup(name, description, members);
  }

  public getAllChatsForUser(userName: string): Observable<Chat[]> {
    return this.apiService.getAllChatsForUser(userName);
  }

  public addContact(userName: string, contactUserName: string): Observable<User> {
    return this.apiService.addContact(userName, contactUserName);
  }

  public getOrCreatePrivateChat(user1: string, user2: string): Observable<Chat> {
    return this.apiService.getOrCreatePrivateChat(user1, user2);
  }
}
