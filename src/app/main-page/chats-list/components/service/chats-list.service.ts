
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

  getUserByUserName(userName: string): Observable<User> {
    return this.apiService.getUserByUserName(userName);
  }

  getAvailableUsers(userName: string): Observable<User[]> {
    return this.apiService.getAvailableUsers(userName);
  }

  createGroup(name: string, description: string, members: string[]): Observable<any> {
    return this.apiService.createGroup(name, description, members);
  }

  getAllChatsForUser(userName: string): Observable<Chat[]> {
    return this.apiService.getAllChatsForUser(userName);
  }

  addContact(userName: string, contactUserName: string): Observable<any> {
    return this.apiService.addContact(userName, contactUserName);
  }

  getOrCreatePrivateChat(user1: string, user2: string): Observable<Chat> {
    return this.apiService.getOrCreatePrivateChat(user1, user2);
  }
}
