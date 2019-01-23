var fs = require('fs');
const topHelper = require('./topHelper');

var openTopFromPath = (fileName) => {
	var buffer = fs.readFileSync('example.top');
	var topFile = topHelper.openTop(buffer);
	// console.log(topFile);
	// console.log(buffer.toString('utf8', 0, 3));
	return topFile;
};

var openTopFromStream = (buffer) => {
	var topFile = topHelper.openTop(buffer);
	// console.log(topFile);
	// console.log(buffer.toString('utf8', 0, 3));
	return topFile;
};

module.exports = {
	openTopFromPath,
	openTopFromStream
}
