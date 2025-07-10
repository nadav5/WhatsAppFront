import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MainPageComponent } from './main-page/components/main-page.component';
import { ChatsListComponent } from './main-page/chats-list/components/chats-list.component';
import { ChatComponent } from './main-page/chats-list/chat/chat.component';
import { MessageComponent } from './main-page/chats-list/chat/message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatsListComponent,
    ChatComponent,
    MessageComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
