import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { GameComponent } from './game/game.component';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './game/board/board.component';

@NgModule({
  declarations: [
    GameComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  bootstrap: [
    GameComponent
  ]
})

export class AppModule { }
