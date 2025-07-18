import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss'],
})
export class ParticipantsComponent {
  @Input() public filteredUsers: string[] = [];
  @Output() public close = new EventEmitter<void>();
  @Output() removeUser = new EventEmitter<string>();

  public searchText: string = '';

  public get filteredUsersBySearch(): string[] {
    if (!this.searchText.trim()) {
      return this.filteredUsers;
    }
    return this.filteredUsers.filter(user =>
      user.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  public onRemove(userName: string): void {
    this.removeUser.emit(userName);
  }

  public closePopup(): void {
    this.close.emit();
  }
}
