const topService = require('./top/topService');
const survexService = require('./survex/survexService');
var path = require('path')
var fs = require('fs');
var fsw = require('fs');
var path = require('path');


//TODO bug!!! 1.30 se bere kot 1.3!!!!

// var topFile = topService.openTopFromPath('example.top');
// //  console.log(topFile.shots.slice(1,3));

 
//  var buffer = fs.readFileSync('./temp/20181209 aja spela proti trubarju.top');
//  var topFileFromStream = topService.openTopFromStream(buffer, 'example.top');
// topFileFromStream.fileIdentifier = 'tr01';
// console.log(topFileFromStream);
// // console.log(topFileFromStream.shots.slice(1,3));
// // console.log(topFileFromStream.shots);

// var svxResult = survexService.createSurvexForTopFile(topFileFromStream);

// console.log(svxResult);


// TODO for collection of files

  

fs.readdir('./temp/', (err, files) => {
    console.log(files);
    var logger = fs.createWriteStream('./temp/log.txt', {
        flags: 'a' // 'a' means appending (old data will be preserved)
    });
    var i = 0;
    for(i = 0; i < files.length; i++){
        
        var file  = files[i];
        if(path.extname(file) !== '.top'){
            continue;
        }
        var topFile = topService.openTopFromPath('./temp/'+file);
        console.log(file);
        topFile.forEach(shot => {
            if(shot.idFrom != null && shot.idTo != null){
                logger.write(`${shot.idFrom.id}\t${shot.idTo.id}\t${shot.dist.toFixed(2)}\t${shot.azimuth.toFixed(2)}\t${shot.incl.toFixed(2)}\r\n`); 
            }
        });
        console.log(i);
    }
    // files.forEach(file => {
        
    // });
    
    
    console.log('close');
    logger.end(); // close string
    
  })