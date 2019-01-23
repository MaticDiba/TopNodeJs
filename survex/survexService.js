const survexHelper = require('./survexHelper');

var createSurvexForTopFile = (topFile) => {
    var singleFileSvx = survexHelper.processFile(topFile);
    return singleFileSvx;
};

var createSurvexForMultipleTopFiles = (topFiles, cavename) => {
    if(cavename === undefined || cavename === ''){
        cavename = 'temp_cave';
    }
    var result = survexHelper.analyzeFileCollection(topFiles);
    
    topFiles.forEach((file) => {
        var singleFile = this.createSurvexForTopFile(file);
    });
};

module.exports = {
	createSurvexForTopFile,
	createSurvexForMultipleTopFiles
}