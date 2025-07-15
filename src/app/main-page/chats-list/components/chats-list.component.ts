import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ViewType } from '../type/view.type';
import { User } from '../type/user.type';
import { Chat } from '../type/chat.type';
import { Router } from '@angular/router';
import { ChatsListService } from './service/chats-list.service';

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

  constructor(private chatsListService: ChatsListService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    this.userName = localStorage.getItem('loggedUser');

    if (this.userName) {
      this.chatsListService.getUserByUserName(this.userName).subscribe({
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
      this.chats = this.currentView === 'contacts' ? this.contactsArr : this.chatsArr;
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
    this.chatsListService.createGroup(name, description, members).subscribe(() => {
      this.showCreateGroupPopup = false;
      this.loadUserChats();
    });
  }

  loadUserChats() {
    this.chatsListService.getAllChatsForUser(this.userName!).subscribe({
      next: (chats) => {
        const chatNames = chats.map((chat) =>
          chat.isGroup && chat.name
            ? chat.name
            : chat.members.find((m) => m !== this.userName) || 'Private Chat'
        );
        this.chatsArr = chatNames;
        this.chats = this.chatsArr;
      },
      error: (err) => {
        console.error('Error fetching chats for user:', err);
      },
    });
  }

  handleAddContact(userName: string) {
    this.chatsListService.addContact(this.userName!, userName).subscribe(() => {
      this.contactsArr.push(userName);
      this.availableUsers = this.availableUsers.filter(
        (user) => user.userName !== userName
      );
    });
  }

  openChat(chatNameOrUser: string) {
    if (this.currentView === 'contacts') {
      this.chatsListService
        .getOrCreatePrivateChat(this.userName!, chatNameOrUser)
        .subscribe((chat) => {
          this.router.navigate(['/chats', chat._id]);
        });
    } else {
      this.router.navigate(['/chats', chatNameOrUser]);
    }
  }
}
