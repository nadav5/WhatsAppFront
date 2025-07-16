import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  joinChat(chatId: string) {
    this.socket.emit('join_chat', chatId);
  }

  sendMessage(message: any) {
    this.socket.emit('send_message', message);
  }

  onNewMessage(callback: (message: any) => void) {
    this.socket.on('new_message', callback);
  }
}
