import {TopService} from './top/topService';
import {SurvexService} from './survex/survexService';
import * as path from 'path';
import * as fs from 'fs';


class App{

    private _topService: TopService;
    private _survexService: SurvexService;

    constructor(){
        //var topFile = topService.openTopFromPath('../example.top');
        //  console.log(topFile.shots.slice(1,3));
        this._topService = new TopService();
        this._survexService = new SurvexService();
         
        var buffer = fs.readFileSync('example.top');
        var topFileFromStream = this._topService.openTopFromStream(buffer, 'example.top');
        topFileFromStream.fileIdentifier = 'tr01';
        // console.log(topFileFromStream.shots.slice(1,3));
        console.log(topFileFromStream.shots);
        
        var svxResult = "svxresult todo:";//this._survexService.createSurvexForTopFile(topFileFromStream);
        
        console.log(svxResult);
    }
}

export default new App();