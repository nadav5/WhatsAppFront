import { Component, OnInit } from '@angular/core';
import { ViewType } from '../chats-list/type/view.type';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit{
  userName: string | null = null;

  currentView?: ViewType;

  ngOnInit(): void {
    this.userName = localStorage.getItem('loggedUser');
  }

  public setView(view: ViewType): void{
    this.currentView=view;
  }

  public logout(){
    localStorage.removeItem('loggedUser');
    console.log('User logged out');
  }
}
