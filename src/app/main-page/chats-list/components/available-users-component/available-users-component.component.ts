import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../type/user.type';
@Component({
  selector: 'app-available-users',
  templateUrl: './available-users-component.component.html',
  styleUrls: ['./available-users-component.component.scss'],
})
export class AvailableUsersComponentComponent {
  @Input() public  availableUsers: User[] = [];
  @Output() public  addContact:EventEmitter<string> = new EventEmitter<string>();
  @Output() public  close: EventEmitter<void> = new EventEmitter<void>();
  public searchText: string = '';

  public onAdd(userName: string) {
    this.addContact.emit(userName);
  }

  public onClose(): void {
    this.close.emit();
  }

  public get filteredUsers(): User[] {
  if (!this.searchText.trim()) {
    return this.availableUsers.slice(0, 5);
  }

  return this.availableUsers
    .filter((u) =>
      u.userName.toLowerCase().includes(this.searchText.toLowerCase())
    )
    .slice(0, 5); 
}

}
