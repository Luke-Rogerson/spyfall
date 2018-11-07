import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartMenuComponent } from './start-menu/start-menu.component';
import { NewGameMenuComponent } from './new-game-menu/new-game-menu.component'
import { JoinGameMenuComponent } from './join-game-menu/join-game-menu.component';
import { LobbyComponent } from './lobby/lobby.component';
import { MainGameDisplayComponent } from './Game-Components/main-game-display/main-game-display.component';

const routes: Routes = [
  {path: '', component: StartMenuComponent},
  {path: 'newgame', component: NewGameMenuComponent},
  {path: 'joingame', component: JoinGameMenuComponent},
  {path: 'lobby', component: LobbyComponent},
  {path: 'game', component: MainGameDisplayComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],

  exports: [ RouterModule ]

})
export class AppRoutingModule { }