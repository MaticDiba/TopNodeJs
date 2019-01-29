import * as fs from "fs";
import { TopHelper } from "./topHelper";

export class TopService {
    private _topHelper: TopHelper;

    constructor(){
        this._topHelper = new TopHelper();
    }
    public openTopFromPath(fileName: string){
        const buffer = fs.readFileSync(fileName);
        const topFile = this._topHelper.openTop(buffer);
        topFile.fileName = fileName;
        // console.log(topFile);
        // console.log(buffer.toString('utf8', 0, 3));
        return topFile;
    }

    public openTopFromStream(buffer: Buffer, fileName: string){
        // console.log(this._topHelper);
        const topFile = this._topHelper.openTop(buffer);
        // console.log(topFile);
        // console.log(buffer.toString('utf8', 0, 3));
        topFile.fileName = fileName;
        return topFile;
    }
    
}

