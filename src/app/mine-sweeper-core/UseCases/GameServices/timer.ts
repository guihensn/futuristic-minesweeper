import { TimeClock} from "../../Entities/timeClock";

export class Timer{
    public totalSeconds: number = 0;
    private setInterval?: number;

    constructor(
        public timeGap: number,
        public timeClock: TimeClock
    ){}


    startInterval(){
        clearInterval(this.setInterval);
        
        this.setInterval = window.setInterval(
            () => {
            this.totalSeconds += this.timeGap/1000;
            this.timeClock.updateTime(this.totalSeconds);
        },this.timeGap);

    }

    stopInterval(){
        clearInterval(this.setInterval);
    }

    reset(){
        this.totalSeconds = 0;
        this.timeClock.reset();
        clearInterval(this.setInterval);
    }
}