const topService = require('./top/topService');
var path = require('path')
var fs = require('fs');

var topFile = topService.openTopFromPath('example.top');
 console.log(topFile.shots.slice(1,3));

 
 var buffer = fs.readFileSync('example.top');
 var topFileFromStream = topService.openTopFromStream(buffer);

console.log(topFileFromStream.shots.slice(1,3));
console.log(topFileFromStream.shots);

