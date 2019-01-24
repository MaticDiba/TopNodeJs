

export class Point{
    private _x: number;
    get x(): number {
        return this._x;
    }
    set x(newX: number) {
        this._x = newX;
    }

    private _y: number;
    get y(): number {
        return this._y;
    }
    set y(newy: number) {
        this._y = newy;
    }

    constructor(x: number, y: number){
        this._x = x;
        this._y = y;
    }
}