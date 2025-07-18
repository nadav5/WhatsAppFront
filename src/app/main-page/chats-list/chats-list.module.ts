import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ChatsListComponent } from './components/chats-list.component';
import { FormsModule } from '@angular/forms';
import { ChatItemComponent } from './components/chat-item/chat-item.component';
import { ChatComponent } from './components/chat/chat.component';
import { MessageComponent } from './components/chat/message/message.component';
import { CreateGroupComponent } from './components/create-group/create-group.component';
import { AvailableUsersComponentComponent } from './components/available-users-component/available-users-component.component';
import { DescriptionComponent } from './components/chat/optione-popup/description/description.component';
import { AddUserChatComponent } from './components/chat/optione-popup/add-user-chat/add-user-chat.component';
import { ParticipantsComponent } from './components/chat/optione-popup/participants/participants.component';

@NgModule({
  declarations: [
    ChatsListComponent,
    ChatItemComponent,
    ChatComponent,
    MessageComponent,
    AvailableUsersComponentComponent,
    CreateGroupComponent,
    DescriptionComponent,
    DescriptionComponent,
    AddUserChatComponent,
    AddUserChatComponent,
    ParticipantsComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [
    ChatsListComponent,
    AvailableUsersComponentComponent,
    CreateGroupComponent,
    ChatComponent,
    DescriptionComponent,
    AddUserChatComponent,
  ],
})
export class ChatsListModule {}
