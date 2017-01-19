/**
 * Created by jojoldu@gmail.com on 2017-01-16
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

const fs = require('fs');
const path = require('path');
const Showdown  = require('showdown');
Showdown.setOption('omitExtraWLInCodeBlocks', true);
Showdown.setOption('ghCodeBlocks', false);
Showdown.setOption('tables', true);
Showdown.setOption('simpleLineBreaks', true);

const converter = new Showdown.Converter();

fs.readFile(path.join(__dirname, "./PARSER.md"), 'utf8', function (err, data) {
    console.log(converter.makeHtml(data));
    process.exit();
});
