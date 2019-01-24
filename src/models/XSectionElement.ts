

class XSectionElement{
    //pointPosition: pointPos, idStation: idStation, direction: direction

    private _pointPosition: Point;
    get pointPosition(): Point {
        return this._pointPosition;
    }
    set pointPosition(newObject: Point) {
        this._pointPosition = newObject;
    }

    private _idStation: Id;
    get idStation(): Id {
        return this._idStation;
    }
    set idStation(newObject: Id) {
        this._idStation = newObject;
    }

    private _direction: number;
    get direction(): number {
        return this._direction;
    }
    set direction(newObject: number) {
        this._direction = newObject;
    }
    constructor(pointPosition: Point, idStation: Id, direction: number){
        this._pointPosition = pointPosition;
        this._idStation = idStation;
        this._direction = direction;
    }
}