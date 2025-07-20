import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { STORAGE_KEYS } from '../chats-list/constants';
import { SocketMessage } from '../chats-list/type/socket-message';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket;

  public connect(userName: string):void {
    if (!this.socket || !this.socket.connected) {
      this.socket = io(STORAGE_KEYS.ANGULAR_PATH, {
        query: { userName },
      });
    }
  }

  public joinChat(chatId: string):void {
    this.socket.emit('join_chat', chatId);
  }
  public leaveChat(chatId: string) :void{
    this.socket.emit('leave_chat', chatId);
  }

  public sendMessage(message: SocketMessage):void {
    this.socket.emit('send_message', message);
  }

  public onNewMessage(callback: (message: SocketMessage) => void):void {
    this.socket.on('new_message', callback);
  }

  public onUpdateActiveUsers(callback: (activeUsers: string[]) => void):void {
    this.socket.on('update_active_users', callback);
  }
}
