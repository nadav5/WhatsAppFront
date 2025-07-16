import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss'],
})
export class CreateGroupComponent {
  @Input() contacts: string[] = [];
  @Output() createGroup = new EventEmitter<{ name: string; description: string; members: string[] }>();
  @Output() close = new EventEmitter<void>();

  groupName: string = '';
  description: string = '';
  selectedMembers: string[] = [];
  public searchText: string = '';

  toggleMember(contact: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedMembers.push(contact);
    } else {
      this.selectedMembers = this.selectedMembers.filter((c) => c !== contact);
    }
  }

  create(): void {
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

  get filteredUsers() {
  return this.contacts.filter(c => c.toLowerCase().includes(this.searchText.toLowerCase()));
}

}
