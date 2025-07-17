import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { STORAGE_KEYS } from '../chats-list/constants';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(STORAGE_KEYS.ANGULAR_PATH);
  }

  public joinChat(chatId: string) {
    this.socket.emit('join_chat', chatId);
  }

  public sendMessage(message: any) {
    this.socket.emit('send_message', message);
  }

  public onNewMessage(callback: (message: any) => void) {
    this.socket.on('new_message', callback);
  }
}
