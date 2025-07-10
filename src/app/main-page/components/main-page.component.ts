import { Component } from '@angular/core';
import { ViewType } from '../chats-list/type/view.type';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  userName: string = 'Nadav';

  currentView?: ViewType;

  public setView(view: ViewType): void{
    this.currentView=view;
  }
}
