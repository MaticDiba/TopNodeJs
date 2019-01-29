

export class Id{

    private _id: string;
    get id(): string {
        return this._id;
    }
    set id(newObject: string) {
        this._id = newObject;
    }

    constructor(id: string){
        this._id = id;
    }
}