import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ChatItemComponent } from './chat-item/chat-item.component';
import { ChatsListComponent } from './components/chats-list.component';

@NgModule({
  declarations: [
    ChatsListComponent,
    ChatItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ChatsListComponent  // לא צריך לייצא את ChatItemComponent, כי משתמשים בו רק בתוך ChatsListComponent
  ]
})
export class ChatsListModule {}
