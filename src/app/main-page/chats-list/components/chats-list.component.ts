import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ViewType } from '../type/view.type';
import { User } from '../type/user.type';
import { Router } from '@angular/router';
import { ChatsListService } from './service/chats-list.service';
import { CreateChatDto } from '../type/create-chat.dto';
import { STORAGE_KEYS } from '../constants';
import { ApiService } from '../../service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.component.html',
  styleUrls: ['./chats-list.component.scss'],
})
export class ChatsListComponent implements OnInit, OnChanges {
  @Input() public currentView?: ViewType;
  public chatsArr: string[] = [];
  public userName: string | null = null;
  public user!: User;
  public showAvailableUsersPopup: boolean = false;
  public showCreateGroupPopup: boolean = false;
  public availableUsers: User[] = [];

  public chatNameToIdMap: { [key: string]: string } = {};

  constructor(
    private chatsListService: ChatsListService,
    private router: Router,
    private apiService: ApiService
  ) {}
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentView'] && this.currentView === 'groups-open-chats') {
      this.loadUserChats();
    }
  }

  public async ngOnInit(): Promise<void> {
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
    this.chatsListService
      .getAvailableUsers(this.userName!)
      .subscribe((users) => {
        this.availableUsers = users;
        this.showAvailableUsersPopup = true;
      });
  }

  public handleCreateGroup(chatData: CreateChatDto): void {
    chatData.members.push(this.userName!);
    this.chatsListService
      .createGroup(chatData.name, chatData.description, chatData.members)
      .subscribe(() => {
        this.showCreateGroupPopup = false;
        this.loadUserChats();
      });
  }

  public loadUserChats(): void {
    this.chatsListService.getAllChatsForUser(this.userName!).subscribe({
      next: (chats) => {
        const chatNames = chats.map((chat) => {
          let displayName = '';

          if (chat.isGroup && chat.name) {
            displayName = chat.name;
          } else {
            const otherMember = chat.members.find((m) => m !== this.userName);
            if (otherMember) {
              displayName = otherMember;
            } else {
              displayName = 'Private Chat';
            }
          }

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
  public deleteChat(contact: string): void {
    Swal.fire({
      title: 'Are you sure you want to remove this contact?',
      text: 'This contact and private chat will be removed.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService
          .removeContactFromUser(this.userName!, contact)
          .subscribe(() => {
            this.user.contacts = this.user.contacts.filter(
              (c) => c !== contact
            );
            this.chatsArr = this.chatsArr.filter((c) => c !== contact);

            this.chatsListService
              .getAllChatsForUser(this.userName!)
              .subscribe((chats) => {
                const privateChat = chats.find(
                  (chat) =>
                    !chat.isGroup &&
                    chat.members.includes(this.userName!) &&
                    chat.members.includes(contact)
                );
                if (privateChat) {
                  this.apiService.deleteChat(privateChat._id).subscribe(() => {
                    console.log('Private chat and messages deleted');
                  });
                }
              });

            Swal.fire({
              title: 'Removed!',
              text: 'The contact and related chat were removed.',
              icon: 'success',
            });
          });
      }
    });
  }
}
