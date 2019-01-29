import { TopFile } from "../models/TopFile";


export class SurvexHelper {

    public  processFile(file: TopFile) {
        if(!file.fileName){
            file.fileName = "tempfilename";
        }
        if(!file.fileIdentifier){
            file.fileIdentifier = "tempfilename";
        }
        const svxMeta = this.getMetaData(file);
        const svxShots = this.getShotsData(file);
        return `*begin ${file.fileIdentifier}\r\n${svxMeta} ${svxShots}\r\n*end ${file.fileIdentifier}`;
    }

    public getMetaForCollection(fileCollection: TopFile[]) {
        var referenceString: string = "";
        var shotCollection: any = {};
        fileCollection.forEach((file) => {
            if(file.references !== undefined && file.references.length > 0){
                file.references.forEach((reference) => {
                    referenceString = `${referenceString}\r\n*fix ${file.fileIdentifier}.${reference.station} ${reference.east} ${reference.north} ${reference.altitude} ; ${reference.comment}`
                    referenceString = `${referenceString}\r\n*entrance ${file.fileIdentifier}.${reference.station}`
                });
            }
            file.shots.forEach((shot) => {
                if(shot.idFrom.id != null){
                    if(shotCollection[shot.idFrom.id] === undefined){
                        shotCollection[shot.idFrom.id] = [];
                    }
                    shotCollection[shot.idFrom.id].push(file.fileIdentifier);
                }
                if(shot.idTo.id != null){
                    if(shotCollection[shot.idTo.id] === undefined){
                        shotCollection[shot.idTo.id] = [];
                    }
                    shotCollection[shot.idFrom.id].push(file.fileIdentifier);
                }
            });
        });

        console.log(shotCollection);
        return {referenceString: referenceString};
    }

    private getMetaData(file: TopFile) {
        return `*data normal from to tape compass clino ignoreall\r\n*alias station - ..\r\n*set decimal (.)\r\n;${
            file.fileName}`;
    }

    private getShotsData(file: TopFile){
        let shotsSvx = "";

        file.shots.forEach((element) => {
            shotsSvx = `${shotsSvx}\r\n${
                element.idFrom ? element.idFrom.id : ".."}\t${
                element.idTo ? element.idTo.id : ".."}\t${
                    element.dist.toFixed(2)}\t${
                    element.azimuth.toFixed(2)}\t${
                    element.incl.toFixed(2)}\t${
                element.comment ? element.comment : ""}`;
        });
    
        return `${shotsSvx}\r\n`;
    }
}
