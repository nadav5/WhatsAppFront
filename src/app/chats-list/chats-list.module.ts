import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatsListRoutingModule } from './chats-list-routing.module';
import { AuthRoutingModule } from '../auth/auth-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ChatsListRoutingModule,
    AuthRoutingModule
  ]
})
export class ChatsListModule { }
