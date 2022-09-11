import { FirstMoveState } from "../GameStates/firstMoveState";
import { IsPlayingState } from "../GameStates/isPlaying";
import { LostState } from "../GameStates/lostState";
import { PausedState } from "../GameStates/pausedState";
import { WinedState } from "../GameStates/winedState";

export class EventsHandler{
    constructor(
        private firstMoveState: FirstMoveState,
        private isPlayingState: IsPlayingState,
        private pausedState: PausedState,
        private lostState: LostState,
        private winedState: WinedState,
    ){}

    onFirstMoveSubscribe(method: Function){
        this.firstMoveState.subscribe(method);
    }

    onIsPlayingSubscribe(method: Function){
        this.isPlayingState.subscribe(method);
    }

    onPausedSubscribe(method: Function){
        this.pausedState.subscribe(method);
    }

    onLostSubscribe(method: Function){
        this.lostState.subscribe(method);
    }

    onWinedSubscribe(method: Function){
        this.winedState.subscribe(method);
    }
}