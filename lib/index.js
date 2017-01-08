/**
 * Created by jojoldu@gmail.com on 2017-01-05
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */
var fs = require('fs');
var path = require('path');
var imageConverter = require('./image-converter');

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
    imageConverter.sendImage({'accessToken':'cbaa8b13fc2d1e2a1e77829f38774551_f336d04631b686f3a65e23acac56b689','blogName':'jojoldu','targetUrl':'jojoldu'}, function (data) {
        console.log(data);
    });
};

//exports.sayHello = sayHello;
sayHello();