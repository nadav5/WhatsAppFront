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
import { Route, Router } from '@angular/router';

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
  showAvailableUsersPopup = false;
  showCreateGroupPopup = false;
  availableUsers: User[] = [];

  constructor(private apiService: ApiService,private router: Router) {}

  async ngOnInit(): Promise<void> {
    this.userName = localStorage.getItem('loggedUser');

    if (this.userName) {
      this.apiService.getUserByUserName(this.userName).subscribe({
        next: (res) => {
          this.user = res;
          this.contactsArr = this.user.contacts;
          this.loadUserChats();
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

  public openCreateGroupPopup(): void {
    this.showCreateGroupPopup = true;
  }

  public openAvailableUsersPopup(): void {
    this.apiService.getAvailableUsers(this.userName!).subscribe((users) => {
      this.availableUsers = users;
      this.showAvailableUsersPopup = true;
    });
  }

  handleCreateGroup({
    name,
    description,
    members,
  }: {
    name: string;
    description: string;
    members: string[];
  }) {
    members.push(this.userName!);
    this.apiService.createGroup(name, description, members).subscribe(() => {
      this.showCreateGroupPopup = false;
      this.loadUserChats();
    });
  }

  loadUserChats() {
    this.apiService.getAllChatsForUser(this.userName!).subscribe({
      next: (chats) => {
        const chatNames: string[] = [];
        chats.forEach((chat) => {
          if (chat.isGroup && chat.name) {
            chatNames.push(chat.name);
          } else {
            const otherUser = chat.members.find((m: string) => m !== this.userName);
            chatNames.push(otherUser || 'Private Chat');
          }
        });
        this.chatsArr = chatNames;
        this.chats = this.chatsArr;
      },
      error: (err) => {
        console.error('Error fetching chats for user:', err);
      },
    });
  }

  handleAddContact(userName: string) {
    this.apiService.addContact(this.userName!, userName).subscribe(() => {
      this.contactsArr.push(userName);
      this.availableUsers = this.availableUsers.filter(
        (user) => user.userName !== userName
      );
    });
  }

  openChat(chatNameOrUser: string) {
  if (this.currentView === 'contacts') {

    this.apiService.getOrCreatePrivateChat(this.userName!, chatNameOrUser).subscribe(chat => {
      this.router.navigate(['/chats', chat._id]);
    });
  } else {
    this.router.navigate(['/chats', chatNameOrUser]);
  }
}
}
