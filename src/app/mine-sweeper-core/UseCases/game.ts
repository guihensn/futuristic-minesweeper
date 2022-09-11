import { Board } from "../Entities/board";
import { State } from "./GameStates/State";
import { EventsHandler } from "./GameServices/eventsHandler";
import { TimeClock } from "../Entities/timeClock";
import { Position } from "../Entities/position";

export class Game {
    state!: State;
    eventsHandler!: EventsHandler;
    markedMines = 0;

    constructor(
        public board: Board,
        public timeClock: TimeClock,
        public minesQuantity: number
    ) { }

    markMine(position: Position) {
        this.state.markMine(position);
    }

    revealField(position: Position) {
        this.state.revealField(position);
    }

    pause() {
        this.state.pause();
    }

    reset() {
        this.state.reset();
    }

    changeState(state: State) {
        this.state = state;
        this.state.emit();
    }
}
