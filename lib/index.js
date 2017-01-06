/**
 * Created by jojoldu@gmail.com on 2017-01-05
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */
var fs = require('fs');
var path = require('path');

var sayHello = function () {
    var dir = process.cwd();
    var files = fs.readdirSync(dir);
    var markdownFile;

    for(var i in files) {
        if(path.extname(files[i]) === '.md') {
            markdownFile = files[i];
            break;
        }
    }

    fs.readFile(markdownFile, 'utf8', function (err, data) {
        console.log(data);
        return data;
    });
};

//exports.sayHello = sayHello;
sayHello();