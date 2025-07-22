import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-user-chat',
  templateUrl: './add-user-chat.component.html',
  styleUrls: ['./add-user-chat.component.scss'],
})
export class AddUserChatComponent {
  @Input() public filteredUsers: string[] = [];
  @Output() public close: EventEmitter<void> = new EventEmitter<void>();
  @Output() public addContact: EventEmitter<string> = new EventEmitter<string>();

  public searchText: string = '';

  public get filteredUsersBySearch(): string[] {
    if (!this.searchText.trim()) {
      return this.filteredUsers;
    }
    return this.filteredUsers.filter(user =>
      user.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  public closePopup(): void {
    this.close.emit();
  }

  public onAdd(userName: string) {
    this.addContact.emit(userName);
  }
}
