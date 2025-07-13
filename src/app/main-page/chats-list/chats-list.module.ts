import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ChatItemComponent } from './chat-item/chat-item.component';
import { ChatsListComponent } from './components/chats-list.component';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
import { MessageComponent } from './chat/message/message.component';

@NgModule({
  declarations: [
    ChatsListComponent,
    ChatItemComponent,ChatComponent,MessageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule 
  ],
  exports: [
    ChatsListComponent  
  ]
})
export class ChatsListModule {}
