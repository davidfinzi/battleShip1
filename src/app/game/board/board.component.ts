import { Component } from '@angular/core';

enum CellStatus {
  Empty = 'empty',
  Ship = 'ship',
  Hit = 'hit',
  Miss = 'miss'
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})

export class BoardComponent {
  rows: any[][] = [];
  shipSizes = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
  shipCount = this.shipSizes.reduce((total, size) => total + size, 0);

  constructor() {
    this.initializeBoard();
    this.placeShips();
  }

  initializeBoard() {
    for (let i = 0; i < 10; i++) {
      this.rows[i] = [];
      for (let j = 0; j < 10; j++) {
        this.rows[i][j] = { status: CellStatus.Empty };
      }
    }
  }

  placeShips() {
    for (const shipSize of this.shipSizes) {
      let placed = false;
      while (!placed) {
        const isVertical = Math.random() < 0.5;
        const row = Math.floor(Math.random() * (isVertical ? (11 - shipSize) : 10));
        const col = Math.floor(Math.random() * (isVertical ? 10 : (11 - shipSize)));

        if (this.canPlaceShip(row, col, shipSize, isVertical)) {
          this.markShip(row, col, shipSize, isVertical);
          placed = true;
        }
      }
    }
  }

  canPlaceShip(row: number, col: number, shipSize: number, isVertical: boolean): boolean {
    const checkAround = (r: number, c: number) => {
        for (let i = Math.max(0, r - 1); i <= Math.min(9, r + 1); i++) {
            for (let j = Math.max(0, c - 1); j <= Math.min(9, c + 1); j++) {
                if (this.rows[i][j].status !== CellStatus.Empty) {
                    return false;
                }
            }
        }
        return true;
    };

    if (isVertical) {
        for (let i = row; i < row + shipSize; i++) {
            if (!checkAround(i, col)) {
                return false;
            }
        }
    } else {
        for (let j = col; j < col + shipSize; j++) {
            if (!checkAround(row, j)) {
                return false;
            }
        }
    }
    return true;
}

  markShip(row: number, col: number, shipSize: number, isVertical: boolean) {
    if (isVertical) {
      for (let i = row; i < row + shipSize; i++) {
        this.rows[i][col].status = CellStatus.Ship;
      }
    } else {
      for (let j = col; j < col + shipSize; j++) {
        this.rows[row][j].status = CellStatus.Ship;
      }
    }
  }

  handleCellClick(row: number, col: number) {
    const clickedCell = this.rows[row][col];

    if (clickedCell.status === CellStatus.Ship) {
      clickedCell.status = CellStatus.Hit;
    } else if (clickedCell.status === CellStatus.Empty) {
      clickedCell.status = CellStatus.Miss;
    }
  }
}