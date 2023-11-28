import { Component, isStandalone } from '@angular/core';

export enum CellStatus {
  Empty = 'empty',
  Ship = 'ship',
  Hit = 'hit',
  Miss = 'miss',
}

@Component({
  selector: 'app-root',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})

export class GameComponent {
  totalCells = 100;
  cellsOccupied = 0;
  rows: number = 10;
  cols: number = 10;
  board: any[][] = [];
  gameStarted: boolean = false;
  gameOver: boolean = false;
  shipsPlaced: number = 0;
  totalShips: number = 10;  
  shootsLeft = 80; 

  handleCellClick(row: number, col: number) {
    if (!this.gameStarted) {
      this.gameStarted = true;
    }

    if (!this.gameOver) {
      const clickedCell = this.board[row][col];

      if (clickedCell.status === CellStatus.Ship) {
        clickedCell.status = CellStatus.Hit;
        this.checkGameOver();
      } else if (clickedCell.status === CellStatus.Empty) {
        clickedCell.status = CellStatus.Miss;
        this.shootsLeft--; 
        this.checkGameEnd();
      }
    }
  }

  checkGameOver() {
    let shipsRemaining = 0;
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (this.board[i][j].status === CellStatus.Ship) {
          shipsRemaining++;
        }
      }
    }

    if (shipsRemaining === 0) {
      this.gameOver = true;
    }
  }

  checkGameEnd() {
    if (this.shootsLeft === 0 && !this.gameOver) {
      this.gameOver = true;
    }
  }
}