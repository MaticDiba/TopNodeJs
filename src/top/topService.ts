import { TopHelper } from "./topHelper";
import * as fs from 'fs';

export class TopService {
    private _topHelper: TopHelper;

    constructor(){
        this._topHelper = new TopHelper();
    }
    openTopFromPath(fileName: string){
        var buffer = fs.readFileSync(fileName);
        var topFile = this._topHelper.openTop(buffer);
        topFile.fileName = fileName;
        // console.log(topFile);
        // console.log(buffer.toString('utf8', 0, 3));
        return topFile;
    }

    openTopFromStream(buffer: Buffer, fileName: string){
        console.log(this._topHelper);
        var topFile = this._topHelper.openTop(buffer);
        // console.log(topFile);
        // console.log(buffer.toString('utf8', 0, 3));
        topFile.fileName = fileName;
        return topFile;
    }
    
}

