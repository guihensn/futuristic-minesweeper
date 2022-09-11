import { Board } from "../../Entities/board";
import { Field } from "../../Entities/field";
import { FieldVisibleStates } from "../../enums/fieldVisibleStates";
import { Position } from "../../Entities/position";

export class BoardUpdater{
    private board: Board;

    constructor(board: Board){
        this.board = board;
    }

    revealBoardField(position: Position){
        let isOut = this.board.fieldIsOutOfBoard(position);
        let isHidden = this.board.fieldIsHidden(position);
        let isPossibleMine = this.board.fieldIsPossibleMine(position);
'   '
        let field: Field = this.board.findField(position);

        if(!(!isOut && ( isHidden || isPossibleMine))) return 

        field.visibleState = FieldVisibleStates.RevealedField;

        if(field.bombsOutside == 0){
            this.revealNeighborsField(position);
        }
    }

    revealNeighborsField(center: Position){
        this.board.walker.courseNeighborsField(center, (nPosition:Position)=>{
            this.revealBoardField(nPosition);
        });
    }

    markMineField(position: Position){
        let isRevealed = this.board.fieldRevealed(position);
        let isOut = this.board.fieldIsOutOfBoard(position);

        if(isRevealed || isOut) return 

        let field: Field = this.board.findField(position);

        field.visibleState = this.getFieldMineNextState(field.visibleState);
    }


    private getFieldMineNextState(state: any) {
        switch (state) {
          case FieldVisibleStates.HiddenField:
            return FieldVisibleStates.MarkedAsMine;
          case FieldVisibleStates.MarkedAsMine:
            return FieldVisibleStates.PossibleMine;
          case FieldVisibleStates.PossibleMine:
            return FieldVisibleStates.HiddenField;
          default:
            return FieldVisibleStates.HiddenField;;
        }
    }
}