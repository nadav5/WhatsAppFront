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

@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.component.html',
  styleUrls: ['./chats-list.component.scss'],
})
export class ChatsListComponent implements OnChanges, OnInit {
  @Input() public currentView?: ViewType;
  contactsArr: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
  chatsArr: string[] = ['1', '2', '3', '4', '5', '6', '7'];
  chats = this.contactsArr;
  userName: string | null = null;
  user!: User;
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('loggedUser');

    if(this.userName){
      this.apiService.getUserByUserName(this.userName).subscribe({
      next: (res) => {
        this.user=res;
        this.contactsArr = this.user.contacts;
        this.chatsArr = [...this.user.groups, ...this.user.contacts];
      },
      error: (err) => {
        console.error('Error:', err);
      },
    });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentView']) {
      console.log(
        'currentView changed to:',
        changes['currentView'].currentValue
      );

      if (this.currentView === 'contacts') {
        this.chats = this.contactsArr;
      } else if (this.currentView === 'groups-open-chats') {
        this.chats = this.chatsArr;
      }
    }
  }
  public showButtonAdd(): boolean {
    return this.currentView === 'contacts' ? true : false;
  }
}
