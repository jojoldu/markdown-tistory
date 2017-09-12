/**
 * Created by jojoldu@gmail.com on 2017. 9. 9.
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

const fs = require('fs-extra');
const imageConverter = require('./image-manager');
const markdownTemplate = require('./markdown-template');
const print = require('./print');
const fileFinder = require('./file-finder');

const xml2js = require('xml2js-es6-promise');
const requestPromise = require('request-promise');

const WRITE_URL = 'https://www.tistory.com/apis/post/write';

const write = function(markdownFile, blogJson, accessToken){
    const parameters = {
        accessToken:accessToken,
        blogName:blogJson.blogName,
        targetUrl:blogJson.targetUrl? blogJson.targetUrl: blogJson.blogName
    };

    return new Promise((resolve)=>{
        resolve({markdownText:markdownFile.data, parameters:parameters});
    })
        .then((response)=>{
            return imageConverter.exchange(response.markdownText, response.parameters);
        })
        .then((replacedMarkdownText)=>{
            return uploadContent(replacedMarkdownText, markdownFile.title, parameters);
        });

};

const uploadContent = function (markdownText, markdownTitle, parameters) {
    const html = markdownTemplate.template(markdownText);
    const options = {
        url: WRITE_URL,
        method: 'post',
        form: {
            access_token: parameters.accessToken,
            visibility: 0,
            blogName: parameters.blogName,
            targetUrl: parameters.targetUrl,
            title: markdownTitle,
            content: html
        }
    };
    return requestPromise(options)
        .then((response) => {
            return xml2js(response);
        })
        .then((json) => {
            return new Promise((resolve) => {
                let statusCode = json.tistory.status[0];
                if(statusCode === "200"){
                    print.yellow('Congratulations!! Posted.');
                } else {
                    print.red("code : " + statusCode + "\nmessage : " + json.tistory['error_message'][0]);
                }

                resolve(json.tistory);
            });
        })
        .catch((err) => {
            throw err;
        });
};

exports.write = write;
exports.uploadContent = uploadContent;
