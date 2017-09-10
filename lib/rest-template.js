/**
 * Created by jojoldu@gmail.com on 2017. 9. 9.
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

const fs = require('fs-extra');
const imageConverter = require('./image-converter');
const markdownTemplate = require('./markdown-template');
const request = require('request');
const print = require('./print');
const parseString = require('xml2js').parseString;

const writeUrl = 'https://www.tistory.com/apis/post/write';

const write = function(markdownFile, blogJson, accessToken, callback){
    fs.readFile(markdownFile.location, 'utf8')
        .then((err, data) => {
            const blogName = blogJson.blogName;
            const targetUrl = blogJson.blogName;
            const title = markdownFile.title;

            const tokenForSendImage = {
                "accessToken":accessToken,
                "blogName":blogName,
                "targetUrl":targetUrl
            };

            imageConverter.sendImage(data, tokenForSendImage, (markdown) => {
                uploadContent(markdown, accessToken, blogName, title, callback);
            });
        });
};

const uploadContent = function (markdown, accessToken, blogName, title, callback) {
    const html = markdownTemplate.template(markdown);
    const options = {
        url: writeUrl,
        method: 'uploadContent',
        form: {
            "access_token": accessToken,
            "visibility": 0,
            "blogName": blogName,
            "targetUrl": blogName,
            "title": title,
            "content": html
        }
    };

    request(options, function (error, response) {
        if (error) {
            throw error;
        }
        if (response.statusCode === 200) {
            print.yellow('Congratulations!! Posted.');
            callback(response);
        } else {
            parseString(response.body, (err, result) => {
                print.red("code : " + response.statusCode + "\nmessage : " + result.tistory['error_message']);
                callback(response);
            });
        }
    });
};

exports.uploadContent = uploadContent;
exports.write = write;
