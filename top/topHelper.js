
var offset;
var openTop = (byteBuffer) => {
	offset = 0;
	var t = readByteString(byteBuffer, 1);
	var o = readByteString(byteBuffer, 2);
	var p = readByteString(byteBuffer, 3);

	var version = readByteInt(byteBuffer);
	if(version !== 3){
		console.log('Only version 3 file is supported');
		return undefined;
	}

	var tripCount = readInt32(byteBuffer);
	console.log(tripCount);
	var tripsResult = readTripCollection(byteBuffer, tripCount);
	var trips = tripsResult[1];
	
	var shotCount = readInt32(byteBuffer);
	
	var shotsResult = readShotCollection(byteBuffer, shotCount);
	var shots = shotsResult[1];
	
	var refCount = readInt32(byteBuffer);
	
	var refResult = readReferenceCollection(byteBuffer, refCount);
	var references = refResult[1];
	
	var mappingResult = readMapping(byteBuffer);
	var mapping = mappingResult[1];
	
	var mappingOutline = readDrawing(byteBuffer);
	var outline = mappingOutline[1];
	
	var mappingSideview = readDrawing(byteBuffer);
	var sideview = mappingSideview[1];
	
	return new TopFile(trips, shots, references, mapping, outline, sideview);
};

var readByteString = (byteBuffer, end) => {

	var result = byteBuffer.toString('utf8', offset, end);
	offset = end;
	return result;
};

var readByteInt = (byteBuffer) => {
	var res = byteBuffer.readInt8(offset);
	offset += 1;
	return res;
};

var readByteArray = (byteBuffer) => {
	var res = byteBuffer.readInt8(offset);
	offset += 1;
	return res;
};

var readInt16 = (byteBuffer) => {
	var res = byteBuffer.readInt16LE(offset);
	offset += 2;
	return res;
};

var readInt32 = (byteBuffer) => {
	var res = byteBuffer.readInt32LE(offset);
	offset += 4;
	return res;
};

var readUInt32 = (byteBuffer) => {
	var res = byteBuffer.readUInt32LE(offset);
	offset += 4;
	return res;
};

var readUInt16 = (byteBuffer) => {
	res = byteBuffer.readUInt16LE(offset);
	offset += 2;
	return res;
};


var readInt64 = (byteBuffer) => {
	var res = readIntLE64(byteBuffer, offset);
	return res;
};

var readId = (byteBuffer) => {
	var id = readUInt32(byteBuffer);
	var idString = id.toString(16);
	if (id == 2147483648){		
		return null;//Convert.ToDouble(val);
	}
	else if (idString.Length <= 4)
	{
		return ((id)*0.1).toString();//Convert.ToDecimal(val)*(decimal)0.1;
	}else{	
		var firstPart = idString.substring(0, idString.length - 4);
		var secondPart = idString.substring(idString.length - 4);
		var realId = parseFloat(parseInt(firstPart, 16) + '.' + parseInt(secondPart, 16));
		return {id: realId};
	}
	return {id: id};
};

var readTripCollection = (byteBuffer, tripCount) => {
	if(tripCount == 0){
		return [offset, {}];
	}
	var i;
	var tripCollection = [];
	for (i = 0; i < tripCount; i++) { 
		var trip = readTrip(byteBuffer, offset, tripCount);
		tripCollection.push(trip[1]);
	}
	
	return [trip[0], tripCollection];
};

var readTrip = (byteBuffer, tripCount) => {
	var time = readInt64(byteBuffer, offset);

	var comment = readComment(byteBuffer, offset);

	var declination = readInt16(byteBuffer, offset);

	return [offset, {time: time, comment: comment, declination: declination}];
};

var readShotCollection = (byteBuffer, shotCount) => {
	var shotCollection =[];
	var i;
	
	for (i = 0; i < shotCount; i++) { 
		var shot = readShot(byteBuffer);
		shotCollection.push(shot[1]);
	}
	
	return [offset, shotCollection];
};

var readShot = (byteBuffer) => {
	var idFrom = readId(byteBuffer);
	var idTo = readId(byteBuffer);
	var dist = readInt32(byteBuffer) / 1000;
	var azimuth = readAzimuth(byteBuffer);
	var incl = readInclination(byteBuffer);
	
	var flags = readByteInt(byteBuffer);
	var roll = readByteInt(byteBuffer);
	var tripIndex = readInt16(byteBuffer);
	
	var comment;
	if(isBitSet(flags, 1)){
		var commentArray = readComment(byteBuffer);
		comment = commentArray[1];
	}
	
	return [offset, {idFrom: idFrom, idTo: idTo, dist: dist, azimuth: azimuth, incl: incl, flags: flags, roll: roll, tripIndex: tripIndex, comment: comment}];
};

var readAzimuth = (byteBuffer) => {
	var azimuth = readUInt16(byteBuffer);
	if (0 <= azimuth && azimuth <= 16384)
	{
		return (azimuth * 90) / 16384;
	}
	else if (16384 <= azimuth && azimuth <= 32768)
	{
		return ((azimuth * 180) / 32768);
	}
	else if (32768 <= azimuth && azimuth <= 49152)
	{
		return ((azimuth * 270) / 49152);
	}
	else{
		return ((azimuth * 360) / 65536);
	}
}
var readInclination = (byteBuffer) => {
	var inclination = readUInt16(byteBuffer);
	 if (0 <= inclination && inclination <= 16384)
	{
		return (inclination * 90) / 16384;
	}
	else if (inclination >= 49152)
	{
		var tmpIncl = 65536 - inclination;
		return -(tmpIncl * 90) / 16384;
	}
	return 0.0;
}
var readReferenceCollection = (byteBuffer, referenceCount) => {
	var refCollection =[];
	var i;
	
	for (i = 0; i < referenceCount; i++) { 
		var ref = readReference(byteBuffer);
		refCollection.push(ref[1]);
	}
	
	return [offset, refCollection];
};

var readReference = (byteBuffer) => {
	var station = readId(byteBuffer);
	var east = readInt64(byteBuffer) / 1000;
	var north = readInt64(byteBuffer) / 1000;
	var altitude = readInt32(byteBuffer) / 1000;
	
	var commentArray = readComment(byteBuffer);
	comment = commentArray[1];
	
	return [offset, {station: station, east: east, north: north, altitude: altitude, comment: comment}];
};

var readPointCollection = (byteBuffer, offset, pointCount) => {
	var pointCollection =[];
	var i;
	for (i = 0; i < pointCount; i++) { 
		var point = readPoint(byteBuffer, offset);
		pointCollection.push(point[1]);
	}
	
	return [offset, pointCollection];
};

var readMapping = (byteBuffer) => {
	var pointResult = readPoint(byteBuffer);
	var point = pointResult[1];
	
	var scale = readUInt32(byteBuffer);
	
	return [offset, {point: point, scale: scale}];
};

var readDrawing = (byteBuffer) => {

	var mappingResult = readMapping(byteBuffer);
	var mapping = mappingResult[1];
	
	var typeOfElement = readByteInt(byteBuffer);
	
	var polygonElements =[];
	var xsectionElements =[];
	while(typeOfElement !== 0){
		if(typeOfElement === 1){
			var polyElement = readPolygonElement(byteBuffer);
			polygonElements.push(polyElement[1]);
		}
		else if(typeOfElement === 3){
			
			var xSectElement = readXsectElement(byteBuffer);
			xsectionElements.push(xSectElement[1]);
		}
		typeOfElement = readByteInt(byteBuffer);
	}
	return [offset, {mapping: mapping, polygonElements: polygonElements, xsectionElements: xsectionElements}];
};

var readXsectElement = (byteBuffer, offset) => {
	var pointPos = readPoint(byteBuffer);
	var idStation = readId(byteBuffer);
	var direction = readUInt32(byteBuffer);

	return [offset, {pointPosition: pointPos, idStation: idStation, direction: direction}];
};

var readPolygonElement = (byteBuffer) => {
	var pointCount = readUInt32(byteBuffer);
	
	var pointsResult = readPointCollection(byteBuffer, pointCount);
	var points = pointsResult[1];
	var color = readByteInt(byteBuffer);

	return [offset, {pointCount: pointCount, points: points, color: color}];
};

var readPoint = (byteBuffer) => {
	var x = readUInt32(byteBuffer);
	
	var y = readUInt32(byteBuffer);
	return [offset, {x: x, y:y}];
};

var isBitSet = (b, pos) => {
	return (b & (1 << pos)) != 0;
}
var readComment = (byteBuffer) => {
	var bytek = readByteInt(byteBuffer);
	var comment;
    if(bytek > 0){
		comment = readByteString(byteBuffer, offset + bytek);
	}
	return [offset, comment];
}
function readIntLE64(buff) {
   var word0 = buff.readUInt32LE(offset);
   var word1 = buff.readUInt32LE(offset+4);
   offset += 8;
   if (!(word1 & 0x80000000))
      return word0 + 0x100000000*word1;
   return -((((~word1)>>>0) * 0x100000000) + ((~word0)>>>0) + 1);
}

module.exports = {
	openTop
}