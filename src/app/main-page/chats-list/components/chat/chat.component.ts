import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessagesDto } from '../../type/messages.dto';
import { ActiveUserDto } from '../../type/active-user.dto';
import { ApiService } from 'src/app/main-page/service/api.service';
import { Chat } from '../../type/chat.type';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  id?: string;
  newMessage: string = '';
  userName!: string;


  messages!: MessagesDto[];
  // messages: MessagesDto[] = [
  //   { id: '1', sender: 'Nadav', text: 'Hi!', time: '10:00', isOwn: true },
  //   { id: '2', sender: 'Alice', text: 'Hello!', time: '10:01', isOwn: false },
  // ];

  activeUsers: ActiveUserDto[] = [
    { initials: 'NA' },
    { initials: 'AL' },
    { initials: 'BO' },
  ];

  chatName!: string;
  chatId!: string;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.chatId = this.route.snapshot.paramMap.get('id')!;
    this.userName = localStorage.getItem('loggedUser')!;

    this.apiService.getChatById(this.chatId).subscribe((res: Chat) => {
      this.chatName =
        res.isGroup && res.name
          ? res.name
          : res.members.find((m) => m !== this.userName) || 'Private Chat';
    });

    this.apiService.getMessagesByChatId(this.chatId).subscribe((res: any[]) => {
      console.log('Messages from API:', res);
      this.messages = res.map((msg) => ({
        id: msg._id,
        sender: msg.sender,
        text: msg.content,
        time: new Date(msg.timestamp).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        isOwn: msg.sender === this.userName,
      }));
    });
  }

  public sendMessage(): void {
  if (this.newMessage.trim()) {
    this.apiService.createMessage(this.chatId, this.userName, this.newMessage).subscribe({
      next: (res) => {
        this.messages.push({
          id: res.id,
          sender: res.sender,
          text: res.text,
          time: new Date(res.time).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          isOwn: res.sender === this.userName,
        });
        this.newMessage = '';
      },
      error: (err) => {
        console.error('Error sending message:', err);
      }
    });
  }
}

}
