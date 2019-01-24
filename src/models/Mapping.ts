
class Mapping{
    private _point: Point;
    get point(): Point {
        return this._point;
    }
    set point(newObject: Point) {
        this._point = newObject;
    }

    private _scale: number;
    get scale(): number {
        return this._scale;
    }
    set scale(newObject: number) {
        this._scale = newObject;
    }

    constructor(point :Point,  scale: number){

    }
}