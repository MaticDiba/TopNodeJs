import { Point } from "./Point";


export class PolygonElement {
    private _color: number;
    get color(): number {
        return this._color;
    }
    set color(newObj: number) {
        this._color = newObj;
    }

    private _points: Point[];
    get points(): Point[] {
        return this._points;
    }
    set points(newObj: Point[]) {
        this._points = newObj;
    }

    private _pointCount: number;
    get pointCount(): number {
        return this._pointCount;
    }
    set pointCount(newObj: number) {
        this._pointCount = newObj;
    }


    constructor(pointCount: number, points: Point[], color: number){
        this._color = color;
        this._pointCount = pointCount;
        this._points = points;
    }
}