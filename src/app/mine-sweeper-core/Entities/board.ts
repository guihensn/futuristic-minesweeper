import { Field } from "./field";
import { FieldVisibleStates } from "../enums/fieldVisibleStates";
import { Position } from "./position";
import { BoardWalker } from "./boardWalker";

export class Board{
    public fields: Field[][] = [];
    public walker!: BoardWalker;
    
    constructor(fields: Field[][]) {
        this.fields = fields;
    }

    findField(position: Position): Field{
        return this.fields[position.x][position.y];
    }

    fieldRevealed(position: Position):boolean {
        let field: Field = this.findField(position);

        return field.visibleState == FieldVisibleStates.RevealedField;
    }

    fieldIsHidden(position: Position):boolean {
        let field: Field = this.findField(position);

        return field.visibleState == FieldVisibleStates.HiddenField;
    }

    fieldIsPossibleMine(position: Position):boolean {
        let field: Field = this.findField(position);

        return field.visibleState == FieldVisibleStates.PossibleMine;
    }

    fieldIsOutOfBoard(position: Position):boolean {
        let minPosition = 0;

        let rangeX = [minPosition, this.height - 1];
        let rangeY = [minPosition, this.width - 1];

        let outX = this.isOutOfRange(position.x, rangeX);
        let outY = this.isOutOfRange(position.y, rangeY);

        return outX || outY;
    }

    public isNeighbor(center:Position, positionToDistribute: Position): boolean{
        let isNeighbor = false;

        this.walker.courseNeighborsField(center, (nPosition:Position) =>{
            if(nPosition.equals(positionToDistribute)){
                isNeighbor = true;
            }
        })

        return isNeighbor;
    }

    public quantityOfMarkedMines(){
        let quantityOfMarkedBombs = 0;

        this.walker.courseAllPositions((position:Position) =>{
            let field = this.findField(position);

            if(field.visibleState == FieldVisibleStates.MarkedAsMine){
                quantityOfMarkedBombs++;
            }
        })

        return quantityOfMarkedBombs;
    }

    public quantityOfMines(){
        let quantityOfBombs = 0;

        this.walker.courseAllPositions((position:Position) =>{
            let field = this.findField(position);
            if(field.hasBomb){
                quantityOfBombs++;
            }
        })

        return quantityOfBombs;
    }

    public getRandomPosisition() {
        let xFloat = Math.random() * (this.height - 1);
        let yFloat = Math.random() * (this.width - 1);

        let xPos = Math.round(xFloat);
        let yPos = Math.round(yFloat);

        return new Position(xPos, yPos);
    }

    public remainingMines(){
        return this.quantityOfMines() - this.quantityOfMarkedMines();
    }

    private isOutOfRange(value:number, [min, max]:number[]):boolean {
        return  value < min || value > max;
    }
    
    get width(): number{
        return this.fields[0].length;
    }
    
    get height(): number{
        return this.fields.length;
    }
}
