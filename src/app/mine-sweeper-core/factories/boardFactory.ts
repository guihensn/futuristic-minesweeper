import { Board } from "../Entities/board";
import { BoardWalker } from "../Entities/boardWalker";
import { Field } from "../Entities/field";
import { FieldVisibleStates } from "../enums/fieldVisibleStates"

export class BoardFactory {
    constructor(
        private boardWidth: number, 
        private boardHeight: number) {
    }

    makeEmptyBoard() {
        let fields = this.initializeFields();
        let board = new Board(fields);
        let boardWalker = new BoardWalker(board);
        board.walker = boardWalker;

        return board;
    }

    private initializeFields(){
        let fields: Array<Array<Field>> = [];

        for (let i = 0; i < this.boardHeight; i++) {
            fields[i] = [];
            for (let j = 0; j < this.boardWidth; j++) {
                let field = new Field(false, FieldVisibleStates.HiddenField, 0);
                fields[i][j] = field;
            }
        }

        return fields;
    }
}