import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ViewType } from '../type/view.type';

@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.component.html',
  styleUrls: ['./chats-list.component.scss'],
})
export class ChatsListComponent implements OnChanges {
  @Input() public currentView?: ViewType;
  a: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
  b: string[] = ['1', '2', '3', '4', '5', '6', '7'];
  chats = this.a;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentView']) {
      console.log(
        'currentView changed to:',
        changes['currentView'].currentValue
      );

      if (this.currentView === 'contacts') {
        this.chats = this.a;
      } else if (this.currentView === 'groups-open-chats') {
        this.chats = this.b;
      }
    }
  }
  public showButtonAdd(): boolean{
    return this.currentView === 'contacts' ? true : false;
  }
}
