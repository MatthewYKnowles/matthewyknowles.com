import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConnectFourComponent} from './games/connect-four/connect-four.component';

const routes: Routes = [
  {path: 'connect-four', component: ConnectFourComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
