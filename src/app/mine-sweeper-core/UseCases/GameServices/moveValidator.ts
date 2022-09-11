import { Board } from "../../Entities/board";
import { Position } from "../../Entities/position";

export class MoveValidator{
    board: Board;

    constructor(board: Board){
        this.board = board;
    }

    isValid(position: Position): boolean {
        let isChecked = this.board.fieldRevealed(position);
        let isOut = this.board.fieldIsOutOfBoard(position);

        return !(isChecked || isOut )
    }
}