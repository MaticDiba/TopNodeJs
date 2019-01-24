
class TopFile {
    private _fileName: string;
    get fileName(): string {
        return this._fileName;
    }
    set fileName(newFileName: string) {
        this._fileName = newFileName;
    }

    private _fileIdentifier: string;
    get fileIdentifier(): string {
        return this._fileIdentifier;
    }
    set fileIdentifier(newFileIdentifier: string) {
        this._fileIdentifier = newFileIdentifier;
    }

    private _trips: Trip[];
    get trips(): Trip[] {
        return this._trips;
    }
    set trips(newTripCollection: Trip[]) {
        this._trips = newTripCollection;
    }

    private _shots: Shot[];
    get shots(): Shot[] {
        return this._shots;
    }
    set shots(newShotCollection: Shot[]) {
        this._shots = newShotCollection;
    }

    private _references: TripReference[];
    get references(): TripReference[] {
        return this._references;
    }
    set references(newReferenceCollection: TripReference[]) {
        this._references = newReferenceCollection;
    }

    _mapping: Mapping; 
    get mapping(): Mapping {
        return this._mapping;
    }
    set mapping(newObj: Mapping) {
        this._mapping = newObj;
    }

    private _outline: Outline;
    get outline(): Outline {
        return this._outline;
    }
    set outline(newOutlineCollection: Outline) {
        this._outline = newOutlineCollection;
    }

    private _sideView: SideView;
    get sideView(): SideView {
        return this._sideView;
    }
    set sideView(newSideViewCollection: SideView) {
        this._sideView = newSideViewCollection;
    }

    constructor(trips: Trip[], shots: Shot[], references: TripReference[], mapping: Mapping, outline: Outline, sideview: SideView){
        this._trips = trips;
        this._shots = shots;
        this._references = references;
        this._mapping = mapping;
        this._outline = outline;
        this._sideView = sideview;
    }
}