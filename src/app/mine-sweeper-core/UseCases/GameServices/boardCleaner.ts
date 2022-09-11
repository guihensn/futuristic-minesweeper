import { Board } from "../../Entities/board";
import { Field } from "../../Entities/field";
import { Position } from "../../Entities/position";
import { FieldVisibleStates } from "../../enums/fieldVisibleStates";

export class BoardCleaner{
    constructor(
        private board:Board
    ){}

    public clean(){
        this.board.walker.courseAllPositions((position:Position)=>{
            let field = this.board.findField(position);
            this.resetField(field);
        })
    }

    private resetField(field: Field){
        field.bombsOutside = 0;
        field.hasBomb = false;
        field.visibleState = FieldVisibleStates.HiddenField;
    }
}