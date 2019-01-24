const topService = require('./top/topService');
const survexService = require('./survex/survexService');
var path = require('path')
var fs = require('fs');

var topFile = topService.openTopFromPath('example.top');
//  console.log(topFile.shots.slice(1,3));

 
 var buffer = fs.readFileSync('example.top');
 var topFileFromStream = topService.openTopFromStream(buffer, 'example.top');
topFileFromStream.fileIdentifier = 'tr01';
// console.log(topFileFromStream.shots.slice(1,3));
// console.log(topFileFromStream.shots);

var svxResult = survexService.createSurvexForTopFile(topFileFromStream);

console.log(svxResult);


// TODO for collection of files

// fs.readdir('./temp/', (err, files) => {
//     console.log(files);
//     files.forEach(file => {
//         var topFile = topService.openTopFromPath('./temp/'+file);
//         console.log(file);
//         topFile.shots.forEach(shot => {
//             if(shot.idFrom != null && shot.idTo != null){
                
                
//                 console.log(`${shot.idFrom.id}\t${shot.idTo.id}\t${shot.dist}\t${shot.azimuth}\t${shot.incl}`);
//             }
//         });
//     });
//   })