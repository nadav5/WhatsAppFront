import { Component, OnInit } from '@angular/core';
import { ViewType } from '../chats-list/type/view.type';
import { STORAGE_KEYS } from '../chats-list/constants';
import { Socket } from 'socket.io-client';
import { SocketService } from '../service/socket.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  public userName: string | null = null;

  public currentView?: ViewType;

  constructor(private socketService:SocketService){}

  public ngOnInit(): void {
    this.userName = localStorage.getItem(STORAGE_KEYS.LOGGED_USER);
  }

  public setView(view: ViewType): void {
    this.currentView = view;
  }

  public logout(): void {
    localStorage.removeItem(STORAGE_KEYS.LOGGED_USER);
    this.socketService.disconnect(); 
    console.log('User logged out');
  }
}
