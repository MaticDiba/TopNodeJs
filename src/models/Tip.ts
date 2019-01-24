

class Trip{
    private _declination: number;
    get declination(): number {
        return this._declination;
    }
    set declination(newObject: number) {
        this._declination = newObject;
    }

    private _comment: string;
    get comment(): string {
        return this._comment;
    }
    set comment(newObject: string) {
        this._comment = newObject;
    }

    private _time: number;
    get time(): number {
        return this._time;
    }
    set time(newObject: number) {
        this._time = newObject;
    }

    constructor(time: number, comment: string, declination: number){
        this._declination = declination;
        this._time = time;
        this._comment = comment;
    }
}