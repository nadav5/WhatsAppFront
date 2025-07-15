import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ChatsListComponent } from './components/chats-list.component';
import { FormsModule } from '@angular/forms';
import { AvailableUsersComponentComponent } from './components/available-users-component/available-users-component.component';
import { ChatItemComponent } from './components/chat-item/chat-item.component';
import { ChatComponent } from './components/chat/chat.component';
import { MessageComponent } from './components/chat/message/message.component';
import { CreateGroupComponent } from './components/create-group/create-group.component';

@NgModule({
  declarations: [
    ChatsListComponent,
    ChatItemComponent,ChatComponent,MessageComponent, AvailableUsersComponentComponent, CreateGroupComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule 
  ],
  exports: [
    ChatsListComponent,
    AvailableUsersComponentComponent,
    CreateGroupComponent
  ]
})
export class ChatsListModule {}
