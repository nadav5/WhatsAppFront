import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { STORAGE_KEYS } from '../chats-list/constants';
import { SocketMessage } from '../chats-list/type/socket-message';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket;

  public connect(userName: string): void {
    if (!this.socket || !this.socket.connected) {
      this.socket = io(STORAGE_KEYS.ANGULAR_PATH, {
        query: { userName },
      });
      console.log('connect');
    }
  }

  public joinChat(chatId: string): void {
    this.socket.emit('join_chat', chatId);
    console.log('joinChat');
  }
  public leaveChat(chatId: string): void {
    this.socket.emit('leave_chat', chatId);
    console.log('leaveChat');
  }

  public sendMessage(message: SocketMessage): void {
    this.socket.emit('send_message', message);
    console.log('sendMessage');
  }

  public onNewMessage(callback: (message: SocketMessage) => void): void {
    this.socket.on('new_message', callback);
    console.log('onNewMessage');
  }

  public onUpdateActiveUsers(callback: (activeUsers: string[]) => void): void {
    this.socket.on('update_active_users', callback);
  }
  public disconnect(): void {
  if (this.socket && this.socket.connected) {
    this.socket.disconnect();
    console.log('Socket disconnected');
  }
}

public leaveChatAsUser(chatId: string, userName: string): void {
  this.socket.emit('leave_chat_user', { chatId, userName });
  console.log(`leaveChatUser emitted for ${userName} in chat ${chatId}`);
}


}
