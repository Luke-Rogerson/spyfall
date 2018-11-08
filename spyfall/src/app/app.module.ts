import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameInfoComponent } from './Game-Components/game-info/game-info.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { LocationListComponent } from './Game-Components/location-list/location-list.component';
import { AppRoutingModule } from './app-routing.module';
import { StartMenuComponent } from './start-menu/start-menu.component';
import { LobbyComponent } from './lobby/lobby.component';
import { NewGameMenuComponent } from './new-game-menu/new-game-menu.component';
import { JoinGameMenuComponent } from './join-game-menu/join-game-menu.component';
import { MainGameDisplayComponent } from './Game-Components/main-game-display/main-game-display.component';

@NgModule({
  declarations: [
    AppComponent,
    GameInfoComponent,
    PlayerListComponent,
    LocationListComponent,
    StartMenuComponent,
    LobbyComponent,
    NewGameMenuComponent,
    JoinGameMenuComponent,
    MainGameDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
