# TopNodeJs

TopNodeJs is a NodeJs library for dealing with PocketTopo (cave survey software) files - *.top.

## Installation

Just use node commands to load all the packages form package.json

```bash
npm install
```

## Usage
Open and load *.top file to JavaScript object. Using JavaScript:

```javascript
const topService = require('./top/topService');

var topFile = topService.openTop('example.top');

```
File is loaded as Json object.

Open and load *.top file to TopFile object. Using TypeScript:
```javascript
import {TopService} from "./top/topService";
import * as path from "path";
import * as fs from "fs";

const fileName = "example.top";
// from buffer
const buffer = fs.readFileSync(fileName);
const topFileFromStream = this._topService.openTopFromStream(buffer, fileName);

// from file path
const topFileFromPath = this._topService.openTopFromPath(fileName);
```
File is loaded as TopFile object.

## Todo
Goals:
* Continue working on SurvexService - to create survex file for one or many files.
* Create tests
* Create more examples

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate. (Tests will be added in one of the next commits).

## License
[MIT](https://choosealicense.com/licenses/mit/)
