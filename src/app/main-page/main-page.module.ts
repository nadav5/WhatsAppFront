import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './components/main-page.component';
import { ChatsListComponent } from './chats-list/components/chats-list.component';

@NgModule({
  declarations: [
    MainPageComponent,
    ChatsListComponent
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    RouterModule
  ]
})
export class MainPageModule { }
