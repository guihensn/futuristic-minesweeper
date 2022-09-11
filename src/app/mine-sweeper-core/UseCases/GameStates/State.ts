import { Subject } from "rxjs";
import { Position } from "../../Entities/position";
import { Game } from "../game";

export class State{
    private stateChange = new Subject<void>();;

    constructor(
        protected game: Game
    ){}

    revealField(position: Position){}

    markMine(position: Position){}

    pause(){}

    reset(){}

    subscribe(method: Function){
        this.stateChange.subscribe({
            next: () => method()
        });
    }

    emit(){
        this.onStateInit();
        this.stateChange.next();
    }

    onStateInit(){}    
}