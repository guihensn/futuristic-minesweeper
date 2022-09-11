import { Position } from "./position";
import { Board } from "./board";

export class BoardWalker{
    private board: Board;

    constructor(board: Board) {
        this.board = board;
    }

    courseNeighborsField(center: Position, delegate: Function){
        let xRange = [center.x - 1, center.x + 1];
        let yRange = [center.y - 1, center.y + 1];

        this.courseArea(xRange, yRange, delegate);
    }

    courseAllPositions(delegate: Function){
        let xRange = [0, this.board.height - 1];
        let yRange = [0, this.board.width - 1];

        this.courseArea(xRange, yRange, delegate);
    }
    courseArea(xRange:Array<number>, yRange:Array<number>, delegate: Function){
        for(let posX = xRange[0]; posX <= xRange[1]; posX++){
            for(let posY = yRange[0]; posY <= yRange[1]; posY++){
                let position = new Position(posX, posY);
                let isFieldOutOfBoard = this.board.fieldIsOutOfBoard(position);
                if(!isFieldOutOfBoard) delegate(position);
            }
        }
    }
}