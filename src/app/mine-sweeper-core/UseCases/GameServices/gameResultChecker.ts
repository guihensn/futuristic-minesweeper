import { Board } from "../../Entities/board";
import { FieldVisibleStates } from "../../enums/fieldVisibleStates"
import { Position } from "../../Entities/position";

export class GameResultChecker {
    private board: Board;

    constructor(board: Board) {
        this.board = board;
    }

    isLosedTheGame(position: Position) {
        let field = this.board.findField(position);

        return field.hasBomb && field.visibleState == FieldVisibleStates.RevealedField
    }

    isWonTheGame(){
        let isWon = true;

        this.board.walker.courseAllPositions((position: Position) => {
            let field = this.board.findField(position);

            let necessaryState = field.hasBomb ? FieldVisibleStates.MarkedAsMine : FieldVisibleStates.RevealedField;

            if (field.visibleState != necessaryState) {
                isWon = false;
            }
        });

        return isWon;
    }
}