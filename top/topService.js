var fs = require('fs');
const topHelper = require('./topHelper');

var openTopFromPath = (fileName) => {
	var buffer = fs.readFileSync(fileName);
	var topFile = topHelper.openTop(buffer);
	topFile.fileName = fileName;
	// console.log(topFile);
	// console.log(buffer.toString('utf8', 0, 3));
	return topFile;
};

var openTopFromStream = (buffer, fileName) => {
	var topFile = topHelper.openTop(buffer);
	// console.log(topFile);
	// console.log(buffer.toString('utf8', 0, 3));
	topFile.fileName = fileName;
	return topFile;
};

module.exports = {
	openTopFromPath,
	openTopFromStream
}
