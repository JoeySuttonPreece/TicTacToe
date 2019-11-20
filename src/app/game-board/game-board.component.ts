import { Component, Input } from '@angular/core';

@Component({
    selector: 'game-board',
    templateUrl: './game-board.component.html',
    styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent {
    size: number;
    board: number[][];
    turn: number;
    winner: number;

    constructor() {
        this.size = 4;
        this.board = [];
        for (let i = 0; i < this.size; i++) {
            this.board[i] = [];
            for (let j = 0; j < this.size; j++) {
                this.board[i][j] = -1;
            }
        }
        this.turn = 0;
    }

    move(event: any) {
        if (this.turn >= 0 && this.board[event.x][event.y] < 0) {
            this.board[event.x][event.y] = this.turn;

            let lines = [];
            let forward = new Set();
            let backward = new Set();
            for (let i = 0; i < this.size; i++) {
                forward.add(this.board[this.size - i - 1][i]);
                backward.add(this.board[i][i]);
                lines.push(new Set(this.board[i]));
                let row = new Set();
                for (let j = 0; j < this.size; j++) {
                    row.add(this.board[j][i]);
                }
                lines.push(row);
            }
            lines.push(forward, backward);

            let win = lines.some((line: Set<number>) => {if (line.size == 1 && (line.has(0) || line.has(1))) {return true}});

            let tied = lines.every((line: Set<number>) => (line.size == (line.has(-1) ? 3 : 2)));

            if (win || tied) {
                if (win) {
                    this.winner = this.turn;
                }
                this.turn = -1;
            } else {
                this.turn = (this.turn + 1) % 2;
            }
        }
    }
}
