import { BoardFactory } from "./boardFactory";
import { BoardUpdater } from "../UseCases/GameServices/boardUpdater";
import { Game } from "../UseCases/game";
import { GameResultChecker} from "../UseCases/GameServices/gameResultChecker";
import { MineDistributor } from "../UseCases/GameServices/mineDistributor";
import { BoardRevealer } from "../UseCases/GameServices/boardRevealer";
import { Timer } from "../UseCases/GameServices/timer";
import { GameConfigs } from "../Entities/gameConfigs";
import { BoardCleaner } from "../UseCases/GameServices/boardCleaner";
import { TimeClock } from "../Entities/timeClock";
import { FirstMoveState } from "../UseCases/GameStates/firstMoveState";
import { IsPlayingState } from "../UseCases/GameStates/isPlaying";
import { WinedState } from "../UseCases/GameStates/winedState";
import { PausedState } from "../UseCases/GameStates/pausedState";
import { LostState } from "../UseCases/GameStates/lostState";
import { EventsHandler } from "../UseCases/GameServices/eventsHandler";

export class GameFactory {
    constructor(
    ) { }

    makeGame(configs: GameConfigs): Game {
        let boardFactory = new BoardFactory(configs.width, configs.height);
        let board = boardFactory.makeEmptyBoard();

        let timeClock = new TimeClock();
        let timer = new Timer(100, timeClock);
        let boardUpdater = new BoardUpdater(board);
        let gameResultChecker = new GameResultChecker(board);
        let mineDistributor = new MineDistributor(board, configs.mineQuantity);
        let boardRevealer = new BoardRevealer(board);
        let boardCleaner = new BoardCleaner(board);

        let game = new Game(board, timeClock, configs.mineQuantity);
        
        let firstMoveState = new FirstMoveState(game, mineDistributor, timer);

        let isPlayingState = new IsPlayingState(
            game, firstMoveState, boardUpdater, gameResultChecker, boardCleaner, timer
        );

        let pausedState = new PausedState(
            game, firstMoveState, isPlayingState, timer, boardCleaner);

        let winedState = new WinedState(
            game, firstMoveState, timer, boardCleaner
        );

        let lostState = new LostState(
            game, firstMoveState, boardRevealer, timer, boardCleaner
        );

        firstMoveState.isPlayingState = isPlayingState;
        isPlayingState.pausedState = pausedState;
        isPlayingState.lostState = lostState;
        isPlayingState.winedState = winedState;

        let eventsHandler = new EventsHandler(
            firstMoveState, 
            isPlayingState, 
            pausedState, 
            lostState, 
            winedState
        )

        game.state = firstMoveState;
        game.eventsHandler = eventsHandler;

        return game;
    }
}