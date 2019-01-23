
//var offset;
var openTop = (byteBuffer) => {
	var offset = 0;
	var t = readByteString(byteBuffer, offset, 1);
	offset = 1;
	var o = readByteString(byteBuffer, offset, 2);
	offset = 2;
	var p = readByteString(byteBuffer, offset, 3);
	offset = 3;
	var version = readByteInt(byteBuffer, offset);
	if(version !== 3){
		console.log('Only version 3 file is supported');
		return undefined;
	}
	offset = 4;
	var tripCount = readInt32(byteBuffer, offset);
	// console.log(tripCount);
	offset = 8;
	var tripsResult = readTripCollection(byteBuffer, offset, tripCount);
	var trips = tripsResult[1];
	offset = tripsResult[0];
	
	var shotCount = readInt32(byteBuffer, offset);
	// console.log(shotCount);
	offset = offset + 4;
	var shotsResult = readShotCollection(byteBuffer, offset, shotCount);
	var shots = shotsResult[1];
	offset = shotsResult[0];
	
	var refCount = readInt32(byteBuffer, offset);
	// console.log(refCount);
	offset = offset + 4;
	var refResult = readReferenceCollection(byteBuffer, offset, refCount);
	var references = refResult[1];
	offset = refResult[0];
	
	var mappingResult = readMapping(byteBuffer, offset);
	var mapping = mappingResult[1];
	offset = mappingResult[0];
	// console.log(mappingResult);
	
	// console.log('Outline: ');
	var mappingOutline = readDrawing(byteBuffer, offset);
	var outline = mappingOutline[1];
	offset = mappingOutline[0];
	
	// console.log('SideView: ');
	var mappingSideview = readDrawing(byteBuffer, offset);
	var sideview = mappingSideview[1];
	offset = mappingSideview[0];
	
	return {trips: trips, shots: shots, references: references, outline: outline, sideview: sideview};
};

var readByteString = (byteBuffer, offset, end) => {

	var result = byteBuffer.toString('utf8', offset, end);
	//console.log(result);
	return result;
};

var readByteInt = (byteBuffer, offset) => {
	return byteBuffer.readInt8(offset);
};

var readByteArray = (byteBuffer, offset) => {
	return byteBuffer.readInt8(offset);
};

var readInt16 = (byteBuffer, offset) => {
	return byteBuffer.readInt16LE(offset);
};

var readInt32 = (byteBuffer, offset) => {
	return byteBuffer.readInt32LE(offset);
};

var readUInt32 = (byteBuffer, offset) => {
	return byteBuffer.readUInt32LE(offset);
};

var readUInt16 = (byteBuffer, offset) => {
	return byteBuffer.readUInt16LE(offset);
};


var readInt64 = (byteBuffer, offset) => {
	return readIntLE64(byteBuffer, offset);
};

var readString = (byteBuffer, offset) => {
	
};

var readId = (byteBuffer, offset) => {
	var id = readUInt32(byteBuffer, offset);
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

var readTripCollection = (byteBuffer, offset, tripCount) => {
	var i;
	var tripCollection = [];
	for (i = 0; i < tripCount; i++) { 
		var trip = readTrip(byteBuffer, offset, tripCount);
		// console.log(trip[1]);
		// console.log(trip[0]);
		tripCollection.push(trip[1]);
	}
	
	// console.log(tripCollection);
	return [trip[0], tripCollection];
};

var readTrip = (byteBuffer, offset, tripCount) => {
	var byteTimeBuffer = Buffer.from(byteBuffer, offset, 8);

	var time = readInt64(byteTimeBuffer, offset);
	
	offset = offset + 8;
	var comment = readComment(byteBuffer, offset);
	offset = offset + 1;
	var declination = readInt16(byteBuffer, offset);
	offset = offset + 2;
	
	return [offset, {time: time, comment: comment, declination: declination}];
};

var readShotCollection = (byteBuffer, offset, shotCount) => {
	var shotCollection =[];
	var i;
	
	for (i = 0; i < shotCount; i++) { 
		var shot = readShot(byteBuffer, offset);
		offset = shot[0];
		//console.log(shot);
		shotCollection.push(shot[1]);
	}
	
	return [offset, shotCollection];
};

var readShot = (byteBuffer, offset) => {
	//var byteTimeBuffer = Buffer.from(byteBuffer, offset, 8);
	var idFrom = readId(byteBuffer, offset);
	offset = offset + 4;
	var idTo = readId(byteBuffer, offset);
	offset = offset + 4;
	var dist = readInt32(byteBuffer, offset) / 1000;
	offset = offset + 4;
	var azimuth = readAzimuth(byteBuffer, offset);
	offset = offset + 2;
	var incl = readInclination(byteBuffer, offset);
	offset = offset + 2;
	
	var flags = readByteInt(byteBuffer, offset);
	offset = offset + 1;
	var roll = readByteInt(byteBuffer, offset);
	offset = offset + 1;
	var tripIndex = readInt16(byteBuffer, offset);
	offset = offset + 2;
	var comment;
	if(isBitSet(flags, 1)){
		var commentArray = readComment(byteBuffer, offset);
		comment = commentArray[1];
		offset = commentArray[0];
	}
	
	return [offset, {idFrom: idFrom, idTo: idTo, dist: dist, azimuth: azimuth, incl: incl, flags: flags, roll: roll, tripIndex: tripIndex, comment: comment}];
};

var readAzimuth = (byteBuffer, offset) => {
	var azimuth = readUInt16(byteBuffer, offset);
	//console.log(azimuth);
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
var readInclination = (byteBuffer, offset) => {
	var inclination = readUInt16(byteBuffer, offset);
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
var readReferenceCollection = (byteBuffer, offset, referenceCount) => {
	var refCollection =[];
	var i;
	
	for (i = 0; i < referenceCount; i++) { 
		var ref = readReference(byteBuffer, offset);
		offset = ref[0];
		refCollection.push(ref[1]);
	}
	
	return [offset, refCollection];
};

var readReference = (byteBuffer, offset) => {
	var station = readId(byteBuffer, offset);
	offset = offset + 4;
	var east = readInt64(byteBuffer, offset) / 1000;
	offset = offset + 8;
	var north = readInt64(byteBuffer, offset) / 1000;
	offset = offset + 8;
	var altitude = readInt32(byteBuffer, offset) / 1000;
	offset = offset + 4;
	
	var commentArray = readComment(byteBuffer, offset);
	comment = commentArray[1];
	offset = commentArray[0];
	
	return [offset, {station: station, east: east, north: north, altitude: altitude, comment: comment}];
};

var readElementCollection = (byteBuffer, offset) => {
	
};

var readPointCollection = (byteBuffer, offset, pointCount) => {
	var pointCollection =[];
	var i;
	// console.log('point count: '+pointCount);
	for (i = 0; i < pointCount; i++) { 
		var point = readPoint(byteBuffer, offset);
		offset = point[0];
		pointCollection.push(point[1]);
	}
	
	return [offset, pointCollection];
};

var readMapping = (byteBuffer, offset) => {
	var pointResult = readPoint(byteBuffer, offset);
	var point = pointResult[1];
	offset = pointResult[0];
	
	var scale = readUInt32(byteBuffer, offset);
	offset = offset + 4;
	
	return [offset, {point: point, scale: scale}];
};

var readDrawing = (byteBuffer, offset) => {

	var mappingResult = readMapping(byteBuffer, offset);
	// console.log(mappingResult);
	offset = mappingResult[0];
	var mapping = mappingResult[1];
	
	var typeOfElement = readByteInt(byteBuffer, offset);
	offset = offset + 1;
	
	var polygonElements =[];
	var xsectionElements =[];
	// console.log(mapping);
	 // console.log(typeOfElement);
	while(typeOfElement !== 0){
		if(typeOfElement === 1){
			var polyElement = readPolygonElement(byteBuffer, offset);
			offset = polyElement[0];
			polygonElements.push(polyElement[1]);
		}
		else if(typeOfElement === 3){
			
			var xSectElement = readXsectElement(byteBuffer, offset);
			offset = xSectElement[0];
			xsectionElements.push(xSectElement[1]);
		}
		typeOfElement = readByteInt(byteBuffer, offset);
		offset = offset + 1;
	}
	// console.log('Point count:');
	// console.log(polygonElements.length);
	return [offset, {mapping: mapping, polygonElements: polygonElements, xsectionElements: xsectionElements}];
};

var readXsectElement = (byteBuffer, offset) => {
	
	return [offset, {}];
};

var readPolygonElement = (byteBuffer, offset) => {
	var pointCount = readUInt32(byteBuffer, offset);
	offset = offset + 4;
	
	var pointsResult = readPointCollection(byteBuffer, offset, pointCount);
	var points = pointsResult[1];
	offset = pointsResult[0];
	var color = readByteInt(byteBuffer, offset);
	offset = offset + 1;
	return [offset, {pointCount: pointCount, points: points, color: color}];
};

var readPoint = (byteBuffer, offset) => {
	var x = readUInt32(byteBuffer, offset);
	offset = offset + 4;
	
	var y = readUInt32(byteBuffer, offset);
	offset = offset + 4;
	return [offset, {x: x, y:y}];
};

var isBitSet = (b, pos) => {
	return (b & (1 << pos)) != 0;
}
var readComment = (byteBuffer, offset) => {
	var bytek = readByteInt(byteBuffer, offset);
	//console.log(bytek);
	comment = readByteString(byteBuffer, offset + 1, offset + bytek + 1);
	//console.log(comment);
	
	return [offset + bytek + 1, comment];
}
function readIntLE64(buff, offset) {
   var word0 = buff.readUInt32LE(offset);
   var word1 = buff.readUInt32LE(offset+4);
   if (!(word1 & 0x80000000))
      return word0 + 0x100000000*word1;
   return -((((~word1)>>>0) * 0x100000000) + ((~word0)>>>0) + 1);
}

module.exports = {
	openTop
}