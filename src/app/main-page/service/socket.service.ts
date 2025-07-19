import { io, Socket } from "socket.io-client";
import { SocketMessage } from "../chats-list/type/socket-message";
import { STORAGE_KEYS } from "../chats-list/constants";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket;

  public connect(userName: string) {
    this.socket = io(STORAGE_KEYS.ANGULAR_PATH, {
      query: { userName },
    });
  }

  public joinChat(chatId: string) {
    this.socket.emit('join_chat', chatId);
  }

  public sendMessage(message: SocketMessage) {
    this.socket.emit('send_message', message);
  }

  public onNewMessage(callback: (message: SocketMessage) => void) {
    this.socket.on('new_message', callback);
  }

  public onUpdateActiveUsers(callback: (activeUsers: string[]) => void) {
    this.socket.on('update_active_users', callback);
  }
}
