import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatsListComponent } from './components/chats-list.component';

const routes: Routes = [
    { path: '', component: ChatsListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatsListRoutingModule { }
