/**
 * Created by jojoldu@gmail.com on 2017-01-07
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

var fs = require('fs');
var path = require('path');
var api = 'https://www.tistory.com/apis/post/attach';

var extractImages = function (markdownFile, params) {
    var imageRegex = /!\[[^\]]+\]\([^)]+\)/g;
    var images = markdownFile.data.match(imageRegex);

    for(var i=0,length=images.length; i<length; i++){
        var afterSplit = images[i].split('(');
        if(afterSplit.length >= 2){
            var image = images[i].split('(')[1].replace(')', '');
            console.log(image);
            var formData = {

            };
        }
    }
};

var findMarkdownFile = function (callback, params) {
    var dir = process.cwd();
    var files = fs.readdirSync(dir);
    var markdownFileName;

    for(var i in files) {
        if(path.extname(files[i]) === '.md') {
            markdownFileName = files[i];
            break;
        }
    }

    fs.readFile(markdownFileName, 'utf8', function (err, data) {
        var markdownFile = {
            "name":dir+"/"+markdownFileName,
            "data":data
        };

        callback(markdownFile, params);
    });
};

var sendImage = function (accessToken) {
    findMarkdownFile(extractImages, accessToken);
};

sendImage({'accessToken':'cbaa8b13fc2d1e2a1e77829f38774551_f336d04631b686f3a65e23acac56b689','blogName':'jojoldu','targetUrl':'jojoldu'});