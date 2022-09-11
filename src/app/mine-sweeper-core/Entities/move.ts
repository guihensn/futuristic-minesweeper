import { Position } from "./position";

export class Move{
    position: Position;
    fieldState: Object;

    constructor(position: Position, fieldState: Object){
        this.position = position;
        this.fieldState = fieldState;
    }
}