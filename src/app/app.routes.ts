import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { BoardComponent } from './game/board/board.component';
import { CellComponent } from './game/board/cell/cell.component';

const routes: Routes = [
  { path: 'game', component: GameComponent },
  { path: 'board', component: BoardComponent },
  { path: 'cell', component: CellComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export default routes;
