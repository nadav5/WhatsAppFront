import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../type/user.type';
@Component({
  selector: 'app-available-users',
  templateUrl: './available-users-component.component.html',
  styleUrls: ['./available-users-component.component.scss'],
})
export class AvailableUsersComponentComponent {
  @Input() availableUsers: User[] = [];
  @Output() addContact = new EventEmitter<string>();
  @Output() close = new EventEmitter<void>();
  public searchText: string = '';


  public onAdd(userName: string) {
    this.addContact.emit(userName);
  }

  public onClose() {
    this.close.emit();
  }

  public get filteredUsers(){
    return this.availableUsers.filter(u=> u.userName.toLowerCase().includes(this.searchText.toLowerCase()));
  }
}
