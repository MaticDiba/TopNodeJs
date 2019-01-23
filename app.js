const topService = require('./top/topService');
var fs = require('fs');

var topFile = topService.openTopFromPath('example.top');
 console.log(topFile.shots[0]);

 
 var buffer = fs.readFileSync('example.top');
 var topFileFromStream = topService.openTopFromStream(buffer);
 
 console.log(topFileFromStream.shots[0]);