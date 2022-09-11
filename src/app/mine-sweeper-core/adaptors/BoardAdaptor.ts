import { IBoardVisual } from "src/app/entities/IBoardVisual";
import { IFieldVisual } from "src/app/entities/IFieldVisual";
import { Board } from "../Entities/board";
import { FieldAdaptor } from "./fieldAdaptor";


export class BoardAdaptor implements IBoardVisual{
    fields: IFieldVisual[][] = [];

    constructor(private board: Board){
        this.prepareFieldViws(board);
    }

    prepareFieldViws(board: Board){
        for(let fieldsRows of board.fields){
            let fieldViewRow = [];
            for(let field of fieldsRows){
                fieldViewRow.push(new FieldAdaptor(field));
            }
            this.fields.push(fieldViewRow);
        }
    }

    get width():number{
        return this.board.width;
    }

    get height():number{
        return this.board.height;
    }
}