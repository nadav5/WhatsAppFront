import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ViewType } from '../type/view.type';
import { ApiService } from '../../service/api.service';
import { User } from '../type/user.type';
import { Chat } from '../type/chat.type';

@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.component.html',
  styleUrls: ['./chats-list.component.scss'],
})
export class ChatsListComponent implements OnChanges, OnInit {
  @Input() public currentView?: ViewType;
  contactsArr: string[] = [];
  chatsArr: string[] = [];
  chats: string[] = [];
  userName: string | null = null;
  user!: User;

  constructor(private apiService: ApiService) {}

  async ngOnInit(): Promise<void> {
    this.userName = localStorage.getItem('loggedUser');

    if (this.userName) {
      this.apiService.getUserByUserName(this.userName).subscribe({
        next: async (res) => {
          this.user = res;
          this.contactsArr = this.user.contacts;

          const chatNames: string[] = [];

          for (const chatId of this.user.chats) {
  try {
    const chat = await this.apiService.getChatById(chatId).toPromise();

    if (chat && chat.isGroup && chat.name) {
      chatNames.push(chat.name);
    } else if (chat) {
      const otherUser = chat.members.find((m: string) => m !== this.userName);
      chatNames.push(otherUser || 'Private Chat');
    } else {
      chatNames.push('Unknown Chat');
    }
  } catch (err) {
    console.error('Error fetching chat:', chatId, err);
    chatNames.push('Unknown Chat');
  }
}


          this.chatsArr = chatNames;
        },
        error: (err) => {
          console.error('Error fetching user:', err);
        },
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentView']) {
      if (this.currentView === 'contacts') {
        this.chats = this.contactsArr;
      } else if (this.currentView === 'groups-open-chats') {
        this.chats = this.chatsArr;
      }
    }
  }

  public showButtonAdd(): boolean {
    return this.currentView === 'contacts';
  }
}
