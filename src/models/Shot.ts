
class Shot{
    
    private _idFrom: Id;
    get idFrom(): Id {
        return this._idFrom;
    }
    set idFrom(newObject: Id) {
        this._idFrom = newObject;
    }

    private _idTo: Id;
    get idTo(): Id {
        return this._idTo;
    }
    set idTo(newObject: Id) {
        this._idTo = newObject;
    }

    private _dist: number;
    get dist(): number {
        return this._dist;
    }
    set dist(newObject: number) {
        this._dist = newObject;
    }

    private _azimuth: number;
    get azimuth(): number {
        return this._azimuth;
    }
    set azimuth(newObject: number) {
        this._azimuth = newObject;
    }

    private _incl: number;
    get incl(): number {
        return this._incl;
    }
    set incl(newObject: number) {
        this._incl = newObject;
    }

    private _flags: number;
    get flags(): number {
        return this._flags;
    }
    set flags(newObject: number) {
        this._flags = newObject;
    }

    private _roll: number;
    get roll(): number {
        return this._roll;
    }
    set roll(newObject: number) {
        this._roll = newObject;
    }

    private _tripIndex: number;
    get tripIndex(): number {
        return this._tripIndex;
    }
    set tripIndex(newObject: number) {
        this._tripIndex = newObject;
    }

    private _comment: string;
    get comment(): string {
        return this._comment;
    }
    set comment(newObject: string) {
        this._comment = newObject;
    }

    constructor(idFrom: Id, idTo: Id, dist: number, azimuth: number, incl: number, flags: number, roll: number, tripIndex: number, comment: string){
        this._idFrom = idFrom;
        this._idTo = idTo;
        this._dist = dist;
        this._azimuth = azimuth;
        this._incl = incl;
        this._flags = flags;
        this._roll = roll;
        this._tripIndex = tripIndex;
        this._comment = comment;
    }
}