import { BoardCleaner } from "../GameServices/boardCleaner";
import { BoardRevealer } from "../GameServices/boardRevealer";
import { Game } from "../game";
import { Timer } from "../GameServices/timer";
import { ResetableState } from "./resetableState";
import { State } from "./State";

export class LostState extends ResetableState {
    constructor(
        game : Game,
        firstMoveState: State,
        private boardRevealer:BoardRevealer,
        timer: Timer,
        boardCleaner: BoardCleaner
    ){
        super(game, firstMoveState, timer, boardCleaner);
    }

    override onStateInit(){
        this.timer.stopInterval();
        this.boardRevealer.reveal();
    }
}