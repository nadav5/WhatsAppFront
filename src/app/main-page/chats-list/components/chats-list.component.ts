import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ViewType } from '../type/view.type';
import { User } from '../type/user.type';
import { Router } from '@angular/router';
import { ChatsListService } from './service/chats-list.service';
import { CreateChatDto } from '../type/create-chat.dto';
import { STORAGE_KEYS } from '../constants';

@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.component.html',
  styleUrls: ['./chats-list.component.scss'],
})
export class ChatsListComponent implements  OnInit {
  @Input() public currentView?: ViewType;
  chatsArr: string[] = [];
  userName: string | null = null;
  user!: User;
  showAvailableUsersPopup = false;
  showCreateGroupPopup = false;
  availableUsers: User[] = [];

  chatNameToIdMap: { [key: string]: string } = {};

  constructor(private chatsListService: ChatsListService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    this.userName = localStorage.getItem(STORAGE_KEYS.LOGGED_USER);
    if (this.userName) {
      this.chatsListService.getUserByUserName(this.userName).subscribe({
        next: (res) => {
          this.user = res;
          this.loadUserChats();
        },
        error: (err) => {
          console.error('Error fetching user:', err);
        },
      });
    }
  }

  public showButtonAdd(): boolean {
    return this.currentView === 'contacts';
  }

  public openCreateGroupPopup(): void {
    this.showCreateGroupPopup = true;
  }

  public openAvailableUsersPopup(): void {
    this.chatsListService.getAvailableUsers(this.userName!).subscribe((users) => {
      this.availableUsers = users;
      this.showAvailableUsersPopup = true;
    });
  }

  public handleCreateGroup(chatData: CreateChatDto) {
    chatData.members.push(this.userName!);
    this.chatsListService.createGroup(chatData.name, chatData.description, chatData.members).subscribe(() => {
      this.showCreateGroupPopup = false;
      this.loadUserChats();
    });
  }

  public loadUserChats(): void {
    this.chatsListService.getAllChatsForUser(this.userName!).subscribe({
      next: (chats) => {
        const chatNames = chats.map((chat) => {
          const displayName =
            chat.isGroup && chat.name
              ? chat.name
              : chat.members.find((m) => m !== this.userName) || 'Private Chat';

          this.chatNameToIdMap[displayName] = chat._id;

          return displayName;
        });

        this.chatsArr = chatNames;
      },
      error: (err) => {
        console.error('Error fetching chats for user:', err);
      },
    });
  }

  public handleAddContact(userName: string): void {
    this.chatsListService.addContact(this.userName!, userName).subscribe(() => {
      this.user.contacts.push(userName);
      this.availableUsers = this.availableUsers.filter(
        (user) => user.userName !== userName
      );
    });
  }

  public openChat(chatNameOrUser: string): void {
    if (this.currentView === 'contacts') {
      this.chatsListService
        .getOrCreatePrivateChat(this.userName!, chatNameOrUser)
        .subscribe((chat) => {
          this.router.navigate(['/chats', chat._id]);
        });
    } else {
      const chatId = this.chatNameToIdMap[chatNameOrUser];
      if (chatId) {
        this.router.navigate(['/chats', chatId]);
      } else {
        console.error('Chat ID not found for:', chatNameOrUser);
      }
    }
  }
}
