import { Board } from "../../Entities/board";
import { Position } from "../../Entities/position";

export class MineDistributor {
    private allValidPositions: Position[] = [];
    constructor(
        private board: Board,
        private quantityOfBombs: number
    ){}

    private generateAllValidPositions(){
        let positions: Position[] = [];
        this.board.walker.courseAllPositions((position:Position)=>{
            positions.push(position);
        })

        return positions;
    }   

    distributeBombs(center: Position) {
        let numberOfBombsToDistribute =  this.quantityOfBombs;
        let validPositions = this.generateAllValidPositions();

        while (numberOfBombsToDistribute > 0) {
            let position = this.getValidRandomPositionToDistribute(center, validPositions); 
            let field = this.board.findField(position);

            field.hasBomb = true;

            this.updateMinesNeighborsCount(position);

            numberOfBombsToDistribute--;
        }
    }

    getValidRandomPositionToDistribute(center: Position, validPositions: Position[]): Position {
        while (true) {
            let arrayRandomIndex = Math.round(Math.random()*(validPositions.length - 1));
            let position = validPositions[arrayRandomIndex];
            validPositions.splice(arrayRandomIndex, 1);
            
            let isPositionCenterNeighbor: boolean = this.board.isNeighbor(center, position);
            let field = this.board.findField(position);

            if (!isPositionCenterNeighbor && !field.hasBomb){
                return position;
            }
        }
    }

    private updateMinesNeighborsCount(position: any) {
        this.board.walker.courseNeighborsField(position, (nPosition: Position) => {
            let nField = this.board.findField(nPosition);
            nField.bombsOutside++;
        });
    }
}