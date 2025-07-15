import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './components/main-page.component';
import { ChatsListModule } from './chats-list/chats-list.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MainPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MainPageRoutingModule,
    ChatsListModule,
    HttpClientModule,
  ]
})
export class MainPageModule {}
