import { Component, Input } from '@angular/core';
import { MessagesDto } from '../../../type/messages.dto';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  @Input() public  message!: MessagesDto;
}
