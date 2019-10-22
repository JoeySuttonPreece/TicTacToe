import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'game-piece',
    templateUrl: './game-piece.component.html',
    styleUrls: ['./game-piece.component.css']
})
export class GamePieceComponent {
    @Input() state: number;
    @Input() x: number;
    @Input() y: number;
    @Output() selected = new EventEmitter<{ x: number, y: number }>();

    select() {
        this.selected.emit({ x: this.x, y: this.y });
    }
}
