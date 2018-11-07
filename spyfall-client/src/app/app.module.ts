import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameInfoComponent } from './game-info/game-info.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { LocationListComponent } from './location-list/location-list.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    GameInfoComponent,
    PlayerListComponent,
    LocationListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
