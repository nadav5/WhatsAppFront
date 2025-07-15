import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export type MessagesType = {
  id: string;
  sender: string;
  text: string;
  time: string;
  isOwn: boolean;
};

export type ActiveUser = {
  initials: string;
};

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  id?: string;
  newMessage: string = '';

  messages: MessagesType[] = [
    { id: '1', sender: 'Nadav', text: 'Hi!', time: '10:00', isOwn: true },
    { id: '2', sender: 'Alice', text: 'Hello!', time: '10:01', isOwn: false }
  ];

  activeUsers: ActiveUser[] = [
    { initials: 'NA' },
    { initials: 'AL' },
    { initials: 'BO' }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    console.log(this.id);
  }

  public sendMessage(): void {
    if (this.newMessage.trim()) {
      this.messages.push({
        id: (this.messages.length + 1).toString(),
        sender: 'You',
        text: this.newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      });
      this.newMessage = '';
    }
  }
}
