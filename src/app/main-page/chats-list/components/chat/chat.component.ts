import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/main-page/service/api.service';
import { SocketService } from 'src/app/main-page/service/socket.service';
import { Chat } from '../../type/chat.type';
import { MessagesDto } from '../../type/messages.dto';
import { STORAGE_KEYS } from '../../constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public newMessage: string = '';
  public userName!: string;
  public messages: MessagesDto[] = [];
  public activeUsers: string[] = [];
  public activeUsersInChat: string[] = [];
  public isOtherOnline: boolean = false;
  public otherMember: string = '';

  public showOptionsMenu: boolean = false;
  public showParticipantsPopup: boolean = false;
  public showAddUsrPopup: boolean = false;
  public showDescriptionPopup: boolean = false;

  public addUsers: string[] = [];
  public seeUsers: string[] = [];

  public chat: Chat = {
    _id: '',
    name: '',
    isGroup: false,
    members: [],
    createdAt: '',
    description: '',
  };

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private socketService: SocketService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.chat._id = this.route.snapshot.paramMap.get('id')!;
    this.userName = localStorage.getItem(STORAGE_KEYS.LOGGED_USER)!;
    this.socketService.connect(this.userName);
    this.socketService.joinChat(this.chat._id);

    this.socketService.onUpdateActiveUsers((activeUserNames: string[]) => {
      this.activeUsers = activeUserNames;
      this.updateActiveUsersInChat();
    });

    this.apiService.getChatById(this.chat._id).subscribe((res: Chat) => {
      this.chat = res;
      this.chat.isGroup = res.isGroup;

      if (res.isGroup && res.name) {
        this.chat.name = res.name;
      } else {
        const other = res.members.find((m) => m !== this.userName);
        this.otherMember = other || '';
        this.chat.name = other || 'Private Chat';
        this.isOtherOnline = this.activeUsers.includes(this.otherMember);
      }

      this.updateActiveUsersInChat();
    });

    this.apiService.getMessagesByChatId(this.chat._id).subscribe((res) => {
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
      if (msg.chatId === this.chat._id) {
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

  private updateActiveUsersInChat(): void {
    if (this.chat.members) {
      this.activeUsersInChat = this.chat.members.filter((m) =>
        this.activeUsers.includes(m)
      );
    }

    if (!this.chat.isGroup && this.otherMember) {
      this.isOtherOnline = this.activeUsers.includes(this.otherMember);
    }
  }

  public sendMessage(): void {
    if (this.newMessage.trim()) {
      this.apiService
        .createMessage(this.chat._id, this.userName, this.newMessage)
        .subscribe({
          next: (res) => {
            this.socketService.sendMessage({
              id: res._id,
              chatId: this.chat._id,
              sender: res.sender,
              text: res.content,
              time: res.timestamp,
            });
            this.newMessage = '';
          },
          error: (err) => console.error('Error sending message:', err),
        });
    }
  }
  public backToChatList(): void {
  this.socketService.leaveChat(this.chat._id);
  this.router.navigate(['/chats']);
}


  public refreshUsersLists(): void {
    this.createSeeUsers();
    this.createAddUsers();
  }

  public createSeeUsers(): void {
    this.apiService.getChatById(this.chat._id).subscribe((u) => {
      this.seeUsers = u.members;
    });
  }

  public createAddUsers(): void {
    this.apiService.getUserByUserName(this.userName).subscribe((u) => {
      this.addUsers = u.contacts.filter((c) => !this.chat.members.includes(c));
    });
  }

  public toggleOptionsMenu(): void {
    this.showOptionsMenu = !this.showOptionsMenu;
  }

  public leaveGroup(): void {
    Swal.fire({
      title: 'Are you sure you want to leave the group?',
      text: "Once you leave, you'll need to be re-added by someone to return.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, leave group!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService
          .removeMemberFromChat(this.chat._id, this.userName)
          .subscribe({
            next: () => {
              Swal.fire({
                title: 'Left group',
                text: 'You have successfully left the group.',
                icon: 'success',
              });
              this.router.navigate(['/chats']);
            },
            error: (err) => {
              Swal.fire({
                title: 'Error',
                text: 'There was a problem leaving the group.',
                icon: 'error',
              });
            },
          });
      }
    });
  }

  public showParticipants(): void {
    this.refreshUsersLists();
    this.showParticipantsPopup = true;
  }

  public handleAddContact(userName: string): void {
    this.apiService.addMemberToChat(this.chat._id, userName).subscribe({
      next: (res) => {
        this.chat = res;
        this.refreshUsersLists();
      },
      error: (err) => console.error('Error adding user to chat:', err),
    });
  }

  public handleRemoveUser(userName: string): void {
    this.apiService.removeMemberFromChat(this.chat._id, userName).subscribe({
      next: (res) => {
        this.chat = res;
        this.refreshUsersLists();
      },
      error: (err) => console.error('Error removing user from chat:', err),
    });
  }

  public toShowAddUsrPopup(): void {
    this.refreshUsersLists();
    this.showAddUsrPopup = true;
  }

  public showGroupDescription(): void {
    this.showDescriptionPopup = true;
  }

  
}
