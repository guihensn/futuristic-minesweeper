export class TimeClock{
    public hours: number = 0;
    public minutes: number = 0;
    public seconds: number = 0;

    updateTime(totalSeconds: number){
        this.hours = Math.floor(totalSeconds / 3600);
        this.minutes = Math.floor((totalSeconds - this.hours * 3600) / 60);
        this.seconds = totalSeconds - this.hours * 3600 - this.minutes * 60;
    }

    reset(){
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
    }
}