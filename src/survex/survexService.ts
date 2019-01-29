import { TopFile } from "../models/TopFile";
import { SurvexHelper } from "./survexHelper";

export class SurvexService {

    constructor(private survexHelper: SurvexHelper) {

    }

    public createSurvexForTopFile(topFileFromStream: TopFile): any {
        const singleFileSvx = this.survexHelper.processFile(topFileFromStream);
        return singleFileSvx;
    }
    
    public createSurvexForMultipleTopFiles(topFiles: TopFile[], cavename: string){
        if (cavename === undefined || cavename === "") {
            cavename = "temp_cave";
        }
        const result = this.survexHelper.getMetaForCollection(topFiles);
    
        topFiles.forEach((file) => {
            const singleFile = this.createSurvexForTopFile(file);
        });
    }
}