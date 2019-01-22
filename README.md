# TopNodeJs

TopNodeJs is a NodeJs library for dealing with PocketTopo (cave survey software) files - *.top.

## Installation

Just use node commands to load all the packages form package.json

```bash
npm install
```

## Usage
Open and load *.top file to JavaScript object.

```javascript
const topService = require('./top/topService');

var topFile = topService.openTop('example.top');

```
File is loaded as Json object.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate. (Tests will be added in one of the next commits).

## License
[MIT](https://choosealicense.com/licenses/mit/)
