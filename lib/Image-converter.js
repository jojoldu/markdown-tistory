/**
 * Created by jojoldu@gmail.com on 2017-01-07
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

const fs = require('fs');
const path = require('path');
const request = require('request');

const api = 'https://www.tistory.com/apis/post/attach';
const localImageRegex = new RegExp("^(http|https)://", "i");

const isNotLocalImage = function (image) {
    return localImageRegex.test(image);
};

const sendImage = function (markdown, params, callback) {
    const imageRegex = /!\[[^\]]+\]\([^)]+\)/g;
    const images = markdown.match(imageRegex) || [];

    const dir = process.cwd();
    Promise.all(images.map(function(markdownImage) {
        return new Promise(function(resolve, reject){
            const image = markdownImage.split('(')[1].replace(')', '');

            if(isNotLocalImage(image)){

            }

            const formData = {
                "access_token":params.accessToken,
                "blogName":params.blogName,
                "targetUrl":params.targetUrl,
                "uploadedfile":fs.createReadStream(path.join(dir,image)),
                "output":"json"
            };

            request.post({url:api, formData:formData}, function (err, response, body) {
                if(err) {
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
    }, function (error) {
        console.log(error);
    });
};



exports.sendImage = sendImage;
