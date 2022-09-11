export class Field{
    hasBomb: boolean;
    visibleState: Object;
    bombsOutside: number;

    constructor(hasBomb: boolean, visibleState: Object, bombsOutside: number) {
        this.hasBomb = hasBomb;
        this.visibleState = visibleState;
        this.bombsOutside = bombsOutside;
    }
}