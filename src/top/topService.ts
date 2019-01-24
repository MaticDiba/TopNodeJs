import { TopHelper } from "./topHelper";
import * as fs from 'fs';

export class TopService {
    private _topHelper: TopHelper;

    constructor(){
        
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
        var topFile = this._topHelper.openTop(buffer);
        // console.log(topFile);
        // console.log(buffer.toString('utf8', 0, 3));
        topFile.fileName = fileName;
        return topFile;
    }
    
}

