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
const markdownImageRegex = /!\[[^\]]+\]\([^)]+\)/g;

const isNotLocalImage = function (image) {
    return localImageRegex.test(image);
};

const sendImage = function (markdown, params, callback) {
    const images = markdown.match(markdownImageRegex) || [];
    const dir = process.cwd();

    Promise.all(images.map(function(markdownImage) {
        return new Promise(function(resolve, reject){
            const image = markdownImage.split('(')[1].replace(')', '');

            if(isNotLocalImage(image)){
                resolve(false);
            }else{
                const formData = {
                    "access_token":params.accessToken,
                    "blogName":params.blogName,
                    "targetUrl":params.targetUrl,
                    "uploadedfile":fs.createReadStream(path.join(dir,image)),
                    "output":"json"
                };

                request.post({url:api, formData:formData}, function (err, response, body) {
                    if(err) {
                        console.log(err);
                        resolve(false);
                    }else{
                        const result = JSON.parse(body);

                        if(result.tistory.status === 200){
                            resolve({"target":image, "replace":result.tistory.url});
                        } else {
                            resolve(false);
                        }
                    }
                });
            }
        });
    })).then(function (replaces) {
        let markdownData = markdown;
        for(let i=0,length=replaces.length;i<length;i++){
            if(markdownData){
                markdownData = markdownData.replace(replaces[i].target, replaces[i].replace);
            }
        }

        callback(markdownData);
    }, function (error) {
        console.log(error);
    });
};



exports.sendImage = sendImage;
