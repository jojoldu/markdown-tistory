/**
 * Created by jojoldu@gmail.com on 2017-01-16
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

const fs = require('fs');
const path = require('path');
const open = require('open');
const Showdown  = require('showdown');
//Showdown.setOption('omitExtraWLInCodeBlocks', true);
//Showdown.setOption('ghCodeBlocks', false);
Showdown.setOption('tables', true);
Showdown.setOption('simpleLineBreaks', true);

const converter = new Showdown.Converter();

fs.readFile(path.join(__dirname, "./PARSER.md"), 'utf8', function (err, data) {
    console.log(converter.makeHtml(data));
    const parserPath = path.join(__dirname, "./parser.html");
    fs.writeFile(parserPath, converter.makeHtml(data), 'utf8', function(err){
        if(err){
            throw err;
        }
        open(parserPath);
        process.exit();
    });

});
