/**
 * Created by jojoldu@gmail.com on 2017-01-16
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

const githubStyle = require('../lib/markdown-template');
const fs = require('fs');
const path = require('path');
const open = require('open');
const Showdown  = require('showdown');
Showdown.setOption('tables', true);
Showdown.setOption('simpleLineBreaks', true);

const converter = new Showdown.Converter();


fs.readFile(path.join(__dirname, "./PARSER.md"), 'utf8', function (err, data) {
    const parserPath = path.join(__dirname, "./parser.html");
    const body = converter.makeHtml(data);
    const html = "<html><head><body>"+githubStyle.apply(body)+"</body></head></html>";
    console.log(html);
    fs.writeFile(parserPath, html, 'utf8', function(err){
        if(err){
            throw err;
        }
        open(parserPath);
    });

});

