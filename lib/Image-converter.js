/**
 * Created by jojoldu@gmail.com on 2017-01-07
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

var fs = require('fs');
var path = require('path');
var request = require('request');

var api = 'https://www.tistory.com/apis/post/attach';

var sendImage = function (markdown, params, callback) {
    var imageRegex = /!\[[^\]]+\]\([^)]+\)/g;
    var images = markdown.match(imageRegex);

    Promise.all(images.map(function(markdownImage) {
        return new Promise(function(resolve, reject){
            var image = markdownImage.split('(')[1].replace(')', '');
            var dir = process.cwd();
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
                    resolve({"target":image, "replace":result.tistory.url});
                } else {
                    reject(response);
                }
            });
        });
    })).then(function (replaces) {
        var markdownData = markdown;
        for(var i=0,length=replaces.length;i<length;i++){
            var replace = replaces[i];
            markdownData = markdownData.replace(replace.target, replace.replace);
        }

        callback(markdownData);
    });
};



exports.sendImage = sendImage;

//sendImage({'accessToken':'cbaa8b13fc2d1e2a1e77829f38774551_f336d04631b686f3a65e23acac56b689','blogName':'jojoldu','targetUrl':'jojoldu'});