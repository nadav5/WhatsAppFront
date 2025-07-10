import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatsListComponent } from './chats-list/components/chats-list.component';
import { ChatComponent } from './chats-list/chat/chat.component';
import { MessageComponent } from './chats-list/chat/message/message.component';
import { MainPageComponent } from './main-page/main-page.component';

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
