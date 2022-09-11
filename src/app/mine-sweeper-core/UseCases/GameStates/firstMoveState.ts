import { Position } from "../../Entities/position";
import { Game } from "../game";
import { MineDistributor } from "../GameServices/mineDistributor";
import { Timer } from "../GameServices/timer";
import { State } from "./State";

export class FirstMoveState extends State {
    isPlayingState!: State;

    constructor(
        game : Game,
        private mineDistributor: MineDistributor,
        private timer: Timer
    ){
        super(game);
    }

    override revealField(position: Position): void {
        this.timer.startInterval();
        this.mineDistributor.distributeBombs(position);
        this.game.changeState(this.isPlayingState);
        this.isPlayingState.revealField(position);
    }
}