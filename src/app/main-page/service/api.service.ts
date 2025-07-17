import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat } from '../chats-list/type/chat.type';
import { User } from '../chats-list/type/user.type';
import { MessagesDto } from '../chats-list/type/messages.dto';
import { STORAGE_KEYS } from '../chats-list/constants';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = STORAGE_KEYS.ANGULAR_PATH;

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

  public addContact(
    userName: string,
    contactUserName: string
  ): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/users/add-contact`, {
      userName,
      contactUserName,
    });
  }

  public createGroup(
    name: string,
    description: string,
    members: string[]
  ): Observable<Chat> {
    return this.http.post<Chat>(`${this.baseUrl}/chats`, {
      name,
      description,
      isGroup: true,
      members,
    });
  }

  public getAllChatsForUser(userName: string): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${this.baseUrl}/chats/by-user/${userName}`);
  }

  public getOrCreatePrivateChat(
    user1: string,
    user2: string
  ): Observable<Chat> {
    return this.http.post<Chat>(`${this.baseUrl}/chats/private`, {
      user1,
      user2,
    });
  }

  public getMessagesByChatId(chatId: string): Observable<MessagesDto[]>{
    return this.http.get<MessagesDto[]>(`${this.baseUrl}/messages/by-chat/${chatId}`)
  }

  public createMessage(chatId: string,senderUserName: string, content: string): Observable<MessagesDto>{
    return this.http.post<MessagesDto>(`${this.baseUrl}/messages`,{
      chatId,
      senderUserName,
      content
    })
  }
}
