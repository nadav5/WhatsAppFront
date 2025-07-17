import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessagesDto } from '../../type/messages.dto';
import { ActiveUserDto } from '../../type/active-user.dto';
import { ApiService } from 'src/app/main-page/service/api.service';
import { Chat } from '../../type/chat.type';
import { STORAGE_KEYS } from '../../constants';
import { SocketService } from 'src/app/main-page/service/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public newMessage: string = '';
  public userName!: string;
  public messages: MessagesDto[] = [];


  public chatName!: string;
  public chatId!: string;
  public isGroup!: boolean;
  public activeUsers: ActiveUserDto[] = [];

  
  public showOptionsMenu: boolean = false;

  public showDescriptionPopup: boolean = false;
  public groupDescription: string = '';

  public chat!:Chat;
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.chatId = this.route.snapshot.paramMap.get('id')!;
    this.userName = localStorage.getItem(STORAGE_KEYS.LOGGED_USER)!;
    this.socketService.joinChat(this.chatId);

    this.apiService.getChatById(this.chatId).subscribe((res: Chat) => {
      this.chat=res;
      this.isGroup = res.isGroup;
      if (res.isGroup && res.name) {
        this.chatName = res.name;
      } else {
        const otherMember = res.members.find((m) => m !== this.userName);
        this.chatName = otherMember ? otherMember : 'Private Chat';
      }
    });

    this.apiService
      .getMessagesByChatId(this.chatId)
      .subscribe((res: MessagesDto[]) => {
        this.messages = res.map((msg) => ({
          _id: msg._id,
          sender: msg.sender,
          content: msg.content,
          timestamp: new Date(msg.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          isOwn: msg.sender === this.userName,
        }));
      });

    this.socketService.onNewMessage((msg) => {
      if (msg.chatId === this.chatId) {
        this.messages.push({
          _id: msg.id,
          sender: msg.sender,
          content: msg.text,
          timestamp: new Date(msg.time).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          isOwn: msg.sender === this.userName,
        });
      }
    });
  }

  public sendMessage(): void {
    if (this.newMessage.trim()) {
      this.apiService
        .createMessage(this.chatId, this.userName, this.newMessage)
        .subscribe({
          next: (res) => {
            this.socketService.sendMessage({
              id: res._id,
              chatId: this.chatId,
              sender: res.sender,
              text: res.content,
              time: res.timestamp,
            });
            this.newMessage = '';
          },
          error: (err) => {
            console.error('Error sending message:', err);
          },
        });
    }
  }

  public toggleOptionsMenu(): void {
    this.showOptionsMenu = !this.showOptionsMenu;
  }

  public leaveGroup() {}

  public showParticipants() {}

  public removeUser() {}

  public addUser() {
   
  }

  public showGroupDescription():void {
    this.groupDescription = this.chat.description;
    this.showDescriptionPopup = true;
  }
}
