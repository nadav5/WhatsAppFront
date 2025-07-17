import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss'],
})
export class CreateGroupComponent {
  @Input() public contacts: string[] = [];

  @Output() public createGroup = new EventEmitter<{
    name: string;
    description: string;
    members: string[];
  }>();
  @Output() public close = new EventEmitter<void>();

  public groupName: string = '';
  public description: string = '';
  public selectedMembers: string[] = [];
  public searchText: string = '';

  public toggleMember(contact: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedMembers.push(contact);
    } else {
      this.selectedMembers = this.selectedMembers.filter((c) => c !== contact);
    }
  }

  public create(): void {
    if (!this.groupName.trim()) {
      alert('Group name is required!');
      return;
    }

    this.createGroup.emit({
      name: this.groupName.trim(),
      description: this.description.trim(),
      members: this.selectedMembers,
    });
  }

  public get filteredUsers(): string[] {
    return this.contacts.filter((c) =>
      c.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
