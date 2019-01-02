import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnectFourComponent } from './games/connect-four/connect-four.component';
import { NavbarComponent } from './navbar/navbar.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ConnectFourPlayerSelectionComponent } from './games/connect-four/connect-four-player-selection/connect-four-player-selection.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnectFourComponent,
    NavbarComponent,
    ConnectFourPlayerSelectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
