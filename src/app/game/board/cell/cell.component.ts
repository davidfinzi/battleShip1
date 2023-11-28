import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  standalone: true,
  imports: [CommonModule]

})
export class CellComponent {
  @Input() status: string = 'empty';

  constructor() { }

  onClick() {
    if (this.status === 'empty') {
      this.status = 'ship'; 
    }
  }
}