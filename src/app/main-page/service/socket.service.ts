import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { STORAGE_KEYS } from '../chats-list/constants';
import { SocketMessage } from '../chats-list/type/socket-message';

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

  public sendMessage(message: SocketMessage ) {
    this.socket.emit('send_message', message);
  }

  public onNewMessage(callback: (message: SocketMessage) => void) {
    this.socket.on('new_message', callback);
  }
}
