import { BoardCleaner } from "../GameServices/boardCleaner";
import { Game } from "../game";
import { Timer } from "../GameServices/timer";
import { FirstMoveState } from "./firstMoveState";
import { ResetableState } from "./resetableState";

export class WinedState extends ResetableState {
    constructor(
        game : Game,
        firstMoveState: FirstMoveState,
        timer: Timer,
        boardCleaner: BoardCleaner,
    ){
        super(game, firstMoveState, timer, boardCleaner);
    }

    override onStateInit(){
        this.timer.stopInterval();
    }
}