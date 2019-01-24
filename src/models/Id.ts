
class Id{

    private _id: number;
    get id(): number {
        return this._id;
    }
    set id(newObject: number) {
        this._id = newObject;
    }

    constructor(id: number){
        this._id = id;
    }
}