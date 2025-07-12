import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './components/main-page.component';
import { ChatsListModule } from './chats-list/chats-list.module';

@NgModule({
  declarations: [
    MainPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MainPageRoutingModule,
    ChatsListModule  // כאן אנחנו מביאים את כל קומפוננטות הרשימה
  ]
})
export class MainPageModule {}
