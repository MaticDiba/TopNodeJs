var processFile = (file) => {
    if(!file.fileName){
        file.fileName = "tempfilename";
    }
    if(!file.fileIdentifier){
        file.fileIdentifier = "tempfilename";
    }
    var svxMeta = getMetaData(file);
    var svxShots = getShotsData(file);
    return `*begin ${file.fileIdentifier}\r\n${svxMeta} ${svxShots}\r\n*end ${file.fileIdentifier}`;
};

var getMetaData = (file) => {
    return `*data normal from to tape compass clino ignoreall\r\n*alias station - ..\r\n*set decimal (.)\r\n;${file.fileName}`;
};


var getMetaForCollection = (fileCollection) => {
    var referenceString = '';
    var shotCollection = {};
    fileCollection.forEach(file => {
        if(file.references !== undefined && file.references.length > 0){
            file.references.forEach(reference => {
                referenceString = `${referenceString}\r\n*fix ${file.fileIdentifier}.${reference.station} ${reference.east} ${reference.north} ${reference.altitude} ; ${reference.comment}`
                referenceString = `${referenceString}\r\n*entrance ${file.fileIdentifier}.${reference.station}`
            });
        }
        file.shots.forEach(shot => {
            if(shot.idFrom.id != null){
                if(shotCollection[shot.idFrom.id] == undefined){
                    shotCollection[shot.idFrom.id] = [];
                }
                shotCollection[shot.idFrom.id].push(file.fileIdentifier);
            }
            if(shot.idTo.id != null){
                if(shotCollection[shot.idTo.id] == undefined){
                    shotCollection[shot.idTo.id] = [];
                }
                shotCollection[shot.idFrom.id].push(file.fileIdentifier);
            }
        });
    });

    console.log(shotCollection);
    return {referenceString: referenceString, };
};

var getShotsData = (file) => {
    var shotsSvx = '';
    file.shots.forEach(element => {
        shotsSvx = `${shotsSvx}\r\n${element.idFrom ? element.idFrom.id : '..'}\t${element.idTo ? element.idTo.id : '..'}\t${element.dist}\t${element.azimuth}\t${element.incl}\t${element.comment ? element.comment : ''}`;
    });

    return `${shotsSvx}\r\n`;
};


module.exports = {
    processFile,
    analyzeFileCollection
}