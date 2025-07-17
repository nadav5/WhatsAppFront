import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-item-chat',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.scss']
})
export class ChatItemComponent {
  @Input() public  name: string = '';
}
