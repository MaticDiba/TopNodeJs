import { Mapping } from "./Mapping";
import { PolygonElement } from "./PolygonElement";
import { XSectionElement } from "./XSectionElement";

export class Drawing{
    private _mapping: Mapping;
    get mapping(): Mapping {
        return this._mapping;
    }
    set mapping(newObject: Mapping) {
        this._mapping = newObject;
    }

    private _polygonElements: PolygonElement[];
    get polygonElements(): PolygonElement[] {
        return this._polygonElements;
    }
    set polygonElements(newObject: PolygonElement[]) {
        this._polygonElements = newObject;
    }

    private _xsectionElements: XSectionElement[];
    get xsectionElements(): XSectionElement[] {
        return this._xsectionElements;
    }
    set xsectionElements(newObject: XSectionElement[]) {
        this._xsectionElements = newObject;
    }
    constructor(mapping: Mapping, polygonElements: PolygonElement[],  xsectionElements: XSectionElement[]){
        this._mapping = mapping;
        this._polygonElements = polygonElements;
        this._xsectionElements = xsectionElements;
    }

}