/**
 * Created by jojoldu@gmail.com on 2017-01-12
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

const fs = require('fs');
const path = require('path');
const toMarkdown = require('to-markdown');
const parseString = require('xml2js').parseString;
const showdown  = require('showdown'),
    converter = new showdown.Converter();
const request = require('request');

const infoManager = require('./info-manager');

const jsonPath = path.join(__dirname, "../");
const url = 'https://www.tistory.com/apis/post/read';

const writeMarkdownById = function (postId) {
    getPostById(postId, writeMarkdown);
};

const getPostById = function (postId, callback) {
    infoManager.getBlogInfo(function (blogInfo) {
        infoManager.getAccessToken(function (accessToken) {
            const options = {
                url : url+'?output=json&access_token='+accessToken+'&blogName='+blogInfo.blogName+'&targetUrl='+blogInfo.targetUrl+'&postId='+postId,
                method : 'get'
            };
            request(options, function (error, response, body) {
                if(error){
                    throw error;
                }
                const result = JSON.parse(body).tistory;
                if(result.status != 200){
                    console.log(result['error_message']);
                    process.exit();
                }
                const html = result.item.content;
                callback(html);
            })
        });
    });
};

const writeMarkdown = function (html) {
    const markdown = toMarkdown(html);
    fs.writeFile(jsonPath+'blog.md', markdown, 'utf8', function(err){
        if(err){
            console.log('An error occurred while writing markdown file ');
            throw err;
        }
        console.log('Completed markdown\n');
        process.exit();
    });

};


writeMarkdownById(72);

exports.writeMarkdownById = writeMarkdownById;
