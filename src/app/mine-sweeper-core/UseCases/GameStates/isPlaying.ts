import { Position } from "../../Entities/position";
import { BoardCleaner } from "../GameServices/boardCleaner";
import { BoardUpdater } from "../GameServices/boardUpdater";
import { Game } from "../game";
import { GameResultChecker } from "../GameServices/gameResultChecker";
import { Timer } from "../GameServices/timer";
import { FirstMoveState } from "./firstMoveState";
import { ResetableState } from "./resetableState";
import { State } from "./State";

export class IsPlayingState extends ResetableState {
    pausedState!: State;
    lostState!: State;
    winedState!: State;

    constructor(
        game : Game,
        firstMoveState: FirstMoveState,
        private boardUpdater: BoardUpdater,
        private gameResultChecker: GameResultChecker,
        boardCleaner: BoardCleaner,
        timer: Timer
    ){
        super(game, firstMoveState, timer, boardCleaner);
    }

    override markMine(position: Position): void {
        this.boardUpdater.markMineField(position);
        this.game.markedMines = this.game.board.quantityOfMarkedMines();
        this.game.changeState(this.getNextState(position));
    }

    override revealField(position: Position): void {
        this.boardUpdater.revealBoardField(position);
        this.game.changeState(this.getNextState(position));
    }

    private getNextState(position: Position):State{
        let state: State = this;

        if (this.gameResultChecker.isLosedTheGame(position)) {
            state = this.lostState;
        }

        if(this.gameResultChecker.isWonTheGame())
        {
            state =  this.winedState;
        }

        return state;
    }

    override pause(): void {
        this.timer.stopInterval();
        this.game.changeState(this.pausedState);
    }
}