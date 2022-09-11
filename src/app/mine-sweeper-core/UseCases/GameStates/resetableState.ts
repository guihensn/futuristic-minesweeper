import { BoardCleaner } from "../GameServices/boardCleaner";
import { Game } from "../game";
import { Timer } from "../GameServices/timer";
import { State } from "./State";

export class ResetableState extends State{
    constructor(
        game : Game,
        private firstMoveState: State,
        protected timer: Timer,
        private boardCleaner:  BoardCleaner,
    ){
        super(game);
    }

    override reset(){
        this.timer.reset();
        this.boardCleaner.clean();
        this.game.markedMines = 0;
        this.game.changeState(this.firstMoveState);
    }
}