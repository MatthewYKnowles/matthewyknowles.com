import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConnectFourComponent} from './games/connect-four/connect-four.component';
import {ConnectFourPlayerSelectionComponent} from './games/connect-four/connect-four-player-selection/connect-four-player-selection.component';

const routes: Routes = [
  {path: 'connect-four', component: ConnectFourComponent},
  {path: 'connect-four-player-selection', component: ConnectFourPlayerSelectionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
