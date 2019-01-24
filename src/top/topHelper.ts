//import { TopFile } from "../models/TopFile";


export class TopHelper{

    private offset: number;

    openTop(buffer: Buffer): TopFile {
        this.offset = 0;
        var t = this.readByteString(buffer, 1);
        var o = this.readByteString(buffer, 2);
        var p = this.readByteString(buffer, 3);

        var version = this.readByteInt(buffer);
        if(version !== 3){
            console.log('Only version 3 file is supported');
            return undefined;
        }

        var tripCount = this.readInt32(buffer);

        var trips = this.readTripCollection(buffer, tripCount);
        
        var shotCount = this.readInt32(buffer);
        
        var shots = this.readShotCollection(buffer, shotCount);
        
        var refCount = this.readInt32(buffer);
        
        var references = this.readReferenceCollection(buffer, refCount);
        
        var mapping = this.readMapping(buffer);
        
        var outline = this.readDrawing(buffer);
        
        var sideview = this.readDrawing(buffer);

        return new TopFile(trips, shots, references, mapping, outline, sideview);
    }

    private readDrawing(buffer: Buffer): Drawing {
        var mappingResult = this.readMapping(buffer);
        var mapping = mappingResult;
        
        var typeOfElement = this.readByteInt(buffer);
        
        var polygonElements: PolygonElement[];
        var xsectionElements: XSectionElement[];
        while(typeOfElement !== 0){
            if(typeOfElement === 1){
                var polyElement = this.readPolygonElement(buffer);
                polygonElements.push(polyElement);
            }
            else if(typeOfElement === 3){
                
                var xSectElement = this.readXsectElement(buffer);
                xsectionElements.push(xSectElement);
            }
            typeOfElement = this.readByteInt(buffer);
        }
        return new Drawing(mapping, polygonElements, xsectionElements);
    }

    private readXsectElement(buffer: Buffer): XSectionElement {
        var pointPos = this.readPoint(buffer);
        var idStation = this.readId(buffer);
        var direction = this.readUInt32(buffer);

        return new XSectionElement(pointPos, idStation, direction);
    }
    
    private readPolygonElement(buffer: Buffer): PolygonElement {
        var pointCount = this.readUInt32(buffer);
	
        var pointsResult = this.readPointCollection(buffer, pointCount);
        var points = pointsResult;
        var color = this.readByteInt(buffer);

        return new PolygonElement(pointCount, points, color);
    }

    private readPointCollection(buffer: Buffer, pointCount: Number): Point[] {
        var pointCollection: Point[];
        var i;
        for (i = 0; i < pointCount; i++) { 
            var point = this.readPoint(buffer);
            pointCollection.push(point);
        }
        
        return pointCollection;
    }

    private readPoint(byteBuffer: Buffer): Point {
        var x = this.readUInt32(byteBuffer);
	
        var y = this.readUInt32(byteBuffer);
        return new Point(x, y);
    }

    private readMapping(buffer: Buffer): Mapping {
        var pointResult = this.readPoint(buffer);
        var point = pointResult;
        
        var scale = this.readUInt32(buffer);
        
        return new Mapping(point, scale);
    }

    private readTripCollection(byteBuffer: Buffer, tripCount: number): Trip[]{
        if(tripCount == 0){
            return null;
        }
        var i;
        var tripCollection: Trip[];
        for (i = 0; i < tripCount; i++) { 
            var trip = this.readTrip(byteBuffer);
            tripCollection.push(trip);
        }
        
        return tripCollection;
    }
    
    private readTrip(byteBuffer: Buffer): Trip{
        var time = this.readInt64(byteBuffer);
    
        var comment = this.readComment(byteBuffer);
    
        var declination = this.readInt16(byteBuffer);
    
        return new Trip(time, comment, declination);
    }

    private readShotCollection(byteBuffer: Buffer, shotCount: number): Shot[]{
        var shotCollection: Shot[];
        var i;
        
        for (i = 0; i < shotCount; i++) { 
            var shot = this.readShot(byteBuffer);
            shotCollection.push(shot);
        }
        
        return shotCollection;
    }
    
    private readShot(byteBuffer: Buffer): Shot{
        var idFrom = this.readId(byteBuffer);
        var idTo = this.readId(byteBuffer);
        var dist = this.readInt32(byteBuffer) / 1000;
        var azimuth = this.readAzimuth(byteBuffer);
        var incl = this.readInclination(byteBuffer);
        
        var flags = this.readByteInt(byteBuffer);
        var roll = this.readByteInt(byteBuffer);
        var tripIndex = this.readInt16(byteBuffer);
        
        var comment;
        if(this.isBitSet(flags, 1)){
            var commentArray = this.readComment(byteBuffer);
            comment = commentArray[1];
        }
        
        return new Shot(idFrom, idTo, dist, azimuth, incl, flags, roll, tripIndex, comment);
    }

    private readReferenceCollection(byteBuffer: Buffer, referenceCount: number): TripReference[]{
        var refCollection: TripReference[];
        var i;
        
        for (i = 0; i < referenceCount; i++) { 
            var ref = this.readReference(byteBuffer);
            refCollection.push(ref);
        }
        
        return refCollection;
    }
    
    private readReference(byteBuffer: Buffer): TripReference{
        var station = this.readId(byteBuffer);
	    var east = this.readInt64(byteBuffer) / 1000;
	    var north = this.readInt64(byteBuffer) / 1000;
	    var altitude = this.readInt32(byteBuffer) / 1000;
	
	    var commentArray = this.readComment(byteBuffer);
	    var comment = commentArray[1];
	
	    return new TripReference(station, east, north, altitude, comment);
    }
    
    private readInclination(byteBuffer: Buffer): number {
        var inclination = this.readUInt16(byteBuffer);
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
    
    private readAzimuth(byteBuffer: Buffer): number {
        var azimuth = this.readUInt16(byteBuffer);
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
    private readId(byteBuffer: Buffer): Id {
        var id = this.readUInt32(byteBuffer);
        var idString = id.toString(16);
        if (id == 2147483648){		
            return null;//Convert.ToDouble(val);
        }
        else if (idString.length <= 4)
        {
            return new Id((id)*0.1);//.toString();//Convert.ToDecimal(val)*(decimal)0.1;
        }else{	
            var firstPart = idString.substring(0, idString.length - 4);
            var secondPart = idString.substring(idString.length - 4);
            var realId = parseFloat(parseInt(firstPart, 16) + '.' + parseInt(secondPart, 16));
            return new Id(realId);
        }
        return new Id(id);
    }



    private readInt16(byteBuffer: Buffer): number {
        var res = byteBuffer.readInt16LE(this.offset);
        this.offset += 2;
        return res;
    }

    private readUInt16(byteBuffer: Buffer): number {
        var res = byteBuffer.readUInt16LE(this.offset);
        this.offset += 2;
        return res;
    }

    private readUInt32(byteBuffer: Buffer): number {
        var res = byteBuffer.readUInt32LE(this.offset);
        this.offset += 4;
        return res;
    }

    private readInt32(byteBuffer: Buffer):number {
        var res = byteBuffer.readInt32LE(this.offset);
        this.offset += 4;
        return res;
    }

    private readInt64(byteBuffer: Buffer): number {
        var res = this.readIntLE64(byteBuffer);
	    return res;
    }

    private readIntLE64(byteBuffer: Buffer): number {
        var word0 = byteBuffer.readUInt32LE(this.offset);
        var word1 = byteBuffer.readUInt32LE(this.offset+4);
        this.offset += 8;
        if (!(word1 & 0x80000000))
            return word0 + 0x100000000*word1;
        return -((((~word1)>>>0) * 0x100000000) + ((~word0)>>>0) + 1);
    }

    private isBitSet(b: number, pos: number): any {
        return (b & (1 << pos)) != 0;
    }

    private readByteString(byteBuffer: Buffer, end: number): string  {

        var result = byteBuffer.toString('utf8', this.offset, end);
        this.offset = end;
        return result;
    }
    
    private readByteInt(byteBuffer: Buffer):number {
        var res = byteBuffer.readInt8(this.offset);
        this.offset += 4;
        return res;
    }

    private readComment(byteBuffer: Buffer): string {
        var bytek = this.readByteInt(byteBuffer);
        var comment;
        if(bytek > 0){
            comment = this.readByteString(byteBuffer, this.offset + bytek);
        }
        return comment;
    }
    
}