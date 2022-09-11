import { BoardCleaner } from "../GameServices/boardCleaner";
import { Game } from "../game";
import { Timer } from "../GameServices/timer";
import { ResetableState } from "./resetableState";
import { State } from "./State";

export class PausedState extends ResetableState {
    constructor(
        game : Game,
        firstMoveState: State,
        private isPlayingState: State,
        timer: Timer,
        boardCleaner: BoardCleaner
    ){
        super(game, firstMoveState, timer, boardCleaner);
    }

    override pause(): void {
        this.timer.startInterval();
        this.game.changeState(this.isPlayingState);
    }
}