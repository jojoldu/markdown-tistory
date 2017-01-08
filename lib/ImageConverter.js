/**
 * Created by jojoldu@gmail.com on 2017-01-07
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

var fs = require('fs');
var path = require('path');
var request = require('request');
var Q = require('q');

var api = 'https://www.tistory.com/apis/post/attach';

var promiseWhile = function (condition, callback) {
    var done = Q.defer();

    function loop() {
        if(!condition()) return done.resolve();
        Q.when(body(), loop, done.reject);
    }

    Q.nextTick(loop);

    return done.promise;
};
//
// var postImage = function (markdownImage, markdownData, params, callback) {
//     var afterSplit = markdownImage.split('(');
//     if(afterSplit.length >= 2){
//         var image = afterSplit[1].replace(')', '');
//         var dir = process.cwd();
//         console.log(image);
//         var formData = {
//             "access_token":params.accessToken,
//             "blogName":params.blogName,
//             "targetUrl":params.targetUrl,
//             "uploadedfile":fs.createReadStream(path.join(dir,image)),
//             "output":"json"
//         };
//
//         request.post({url:api, formData:formData}, function (err, response, body) {
//             if(err){
//                 throw err;
//             }
//             var result = JSON.parse(body);
//
//             if(result.tistory.status == 200){
//                 return markdownData.replace(image, result.tistory.url);
//             } else {
//                 return '';
//             }
//         });
//     }
// };

var extractImages = function (markdownFile, params) {
    var markdownData = markdownFile.data;
    var imageRegex = /!\[[^\]]+\]\([^)]+\)/g;
    var images = markdownFile.data.match(imageRegex);

    Promise.all(images.map(function(markdownImage) {
        return new Promise(function(resolve, reject){
            var image = markdownImage.split('(')[1].replace(')', '');
            var dir = process.cwd();
            console.log(image);

            var formData = {
                "access_token":params.accessToken,
                "blogName":params.blogName,
                "targetUrl":params.targetUrl,
                "uploadedfile":fs.createReadStream(path.join(dir,image)),
                "output":"json"
            };

            request.post({url:api, formData:formData}, function (err, response, body) {
                if(err){
                    throw err;
                }
                var result = JSON.parse(body);

                if(result.tistory.status == 200){
                    resolve(markdownData.replace(image, result.tistory.url));
                } else {
                    reject(response);
                }
            });
        });
    })).then(function (markdown) {
        return markdown;
    });
};

var findMarkdownFile = function (callback, params) {
    var dir = process.cwd();
    var files = fs.readdirSync(dir);
    var markdownFileName;

    for(var i=0,length=files.length;i<length; i++) {
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