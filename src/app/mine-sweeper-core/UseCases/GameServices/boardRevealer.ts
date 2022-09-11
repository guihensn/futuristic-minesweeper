import { Board } from "../../Entities/board";
import { Position } from "../../Entities/position";
import { FieldVisibleStates } from "../../enums/fieldVisibleStates";

export class BoardRevealer{
    constructor(
        private board:Board
    ){}

    public reveal(){
        this.board.walker.courseAllPositions((position:Position)=>{
            let field = this.board.findField(position);

            if(field.hasBomb && field.visibleState == FieldVisibleStates.HiddenField){
                field.visibleState = FieldVisibleStates.OtherBombsRevealed;
            }
        })
    }
}