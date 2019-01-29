import { Id } from "./Id";

export class TripReference {
    private _station: Id;
    get station(): Id {
        return this._station;
    }
    set station(newObject: Id) {
        this._station = newObject;
    }

    private _east: number;
    get east(): number {
        return this._east;
    }
    set east(newObject: number) {
        this._east = newObject;
    }

    private _north: number;
    get north(): number {
        return this._north;
    }
    set north(newObject: number) {
        this._north = newObject;
    }

    private _altitude: number;
    get altitude(): number {
        return this._altitude;
    }
    set altitude(newObject: number) {
        this._altitude = newObject;
    }

    private _comment: string;
    get comment(): string {
        return this._comment;
    }
    set comment(newObject: string) {
        this._comment = newObject;
    }


    constructor(station: Id, east: number, north: number, altitude: number, comment: string){
        this._altitude = altitude;
        this._comment = comment;
        this._east = east;
        this._north = north;
        this._comment = comment;
        this._station = station;
    }
}