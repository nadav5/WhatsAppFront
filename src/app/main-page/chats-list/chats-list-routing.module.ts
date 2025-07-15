import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from '../components/main-page.component';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: ':id', component: ChatComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainPageRoutingModule { }
