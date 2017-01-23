/**
 * Created by jojoldu@gmail.com on 2017-01-02
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

const imageConverter = require('./image-converter');
const print = require('./print');
const reader = require('./reader');
const githubStyle = require('./github-style');

const request = require('request');
const express = require('express');
const open = require('open');
const fs = require('fs');
const path = require('path');
const Showdown  = require('showdown');
Showdown.setOption('tables', true);
Showdown.setOption('simpleLineBreaks', true);
const converter = new Showdown.Converter();

const readLine = require('readline'),
    r = readLine.createInterface({input:process.stdin, output:process.stdout});

const redirectUri = 'http://localhost:5000/callback';
const jsonPath = path.join(__dirname, "../");

const start = function() {
    const command = process.argv[2];

    if(command == 'write') {
        write();
    }else if(command == 'init') {
        init();
    }else if(command == 'token') {
        getToken();
    }else if(command == 'show-info') {
        showJson();
    }else if(command == 'read') {
        const postId = process.argv[3];
        if(postId){
            reader.writeMarkdownById(postId);
        }else{
            print.red('This input is not invalid. \nPlease enter only numbers.');
        }
    }else{
        print.yellow("markdown-tistory \<command\> \ncommand are init, write, token \nexample) \n markdown-tistory init \n markdown-tistory write");
        process.exit();
    }
};

const init = function () {
    const messages = [
        {prop: "blogName", question:"blog name (ex: xxx of xxx.tistory.com ) : ", answer:""},
        {prop: "clientId", question:"client id : ", answer:""},
        {prop: "secretKey", question:"secret key: ", answer:""}
    ];

    let index = 0;
    const recursiveAsyncReadLine = function () {
        r.question(messages[index].question, function (answer) {

            if(!answer) {
                print.red('Invalid input.');
                return r.close();
            }

            messages[index].answer = answer;

            if(index == messages.length-1){
                let blogJson = {};
                for(let i=0, length=messages.length; i<length; i++){
                    let message = messages[i];
                    blogJson[message.prop] = message.answer;
                }
                fs.writeFile(jsonPath+'blog.json', JSON.stringify(blogJson), 'utf8', function(err){
                    if(err){
                        print.red('An error occurred while issuing blog.json ');
                        throw err;
                    }
                    print.yellow('Completed blog information\nProceeding with accessToken');
                    getToken();
                });
                return r.close();
            }

            index++;
            recursiveAsyncReadLine();
        });
    };

    recursiveAsyncReadLine();
};

const getToken = function () {
    getBlogJson(downloadAccessToken);
};

const getBlogJson = function (callback) {
    fs.readFile(jsonPath+'blog.json', 'utf8', function (err, data) {
        if (err) {
            print.red('There is no blog information. \nPlease run markdown-tistory init');
            throw err;
        }
        callback(JSON.parse(data));
    });
};

const downloadAccessToken = function(blogJson) {

    const startCallbackServer = function (blogJson) {
        let app = express();
        app.listen(5000);
        app.get('/callback', function(req, res) {
            const code = req.query.code;

            if(code){
                getAccessToken(code, blogJson);
            }

        });
    };

    const openGetCode = function(blogJson) {
        const clientId = blogJson['clientId'];
        const parameter = 'client_id='+clientId+'&redirect_uri='+redirectUri+'&response_type=code';
        const authorizeUrl = 'https://www.tistory.com/oauth/authorize?'+parameter;
        open(authorizeUrl);
    };

    const getAccessToken = function(code, blogJson) {
        const clientId = blogJson['clientId'];
        const clientSecret = blogJson['secretKey'];
        const parameter = 'client_id='+clientId+'&client_secret='+clientSecret+'&redirect_uri='+redirectUri+'&code='+code+'&grant_type=authorization_code';

        const options = {
            url : 'https://www.tistory.com/oauth/access_token?'+parameter,
            method : 'get'
        };

        request(options, function(error, response, body) {
            const bodyParsing = body.split('=');
            if(error){
                print.red('There was a problem in requesting access token from the Tistory API');
                throw error;
            }
            if(bodyParsing[0] == 'error') {
                print.red('There was a problem in requesting access token from the Tistory API.\n'+bodyParsing[1]);
                process.exit();
            }

            const accessToken = bodyParsing[1];
            if(accessToken){
                fs.writeFile(jsonPath+'token.json', JSON.stringify({"accessToken":accessToken}), 'utf8', function(err){
                    if(err) {
                        print.red('There was a problem creating the access token file.\n');
                        throw err;
                    }
                    print.yellow('Access token issued.');
                    process.exit();
                });
            }
        });
    };
    openGetCode(blogJson);

    startCallbackServer(blogJson);
};

const showJson = function () {
    getBlogJson(function(data) {
        print.red(JSON.stringify(data));
        process.exit();
    });
};

const findMarkdownFile = function (callback, blogJson, accessToken) {
    const dir = process.cwd();
    const files = fs.readdirSync(dir);
    let markdownFileName;

    for(let i=0,length=files.length;i<length;i++) {
        if(path.extname(files[i]) === '.md') {
            markdownFileName = files[i];
            break;
        }
    }
    if(markdownFileName){
        fs.readFile(markdownFileName, 'utf8', function (err, data) {
            const markdownFile = {
                "name":dir+"/"+markdownFileName,
                "data":data
            };

            callback(markdownFile, blogJson, accessToken);
        });
    }else{
        print.red('There are no Markdown files in the current folder.');
    }
};

const write = function() {
    getBlogJson(posting);
};

const posting = function (blogJson) {

    fs.readFile(jsonPath+'token.json', 'utf8', function (err, data) {
        if (err) {
            print.red('There is no access token information \nPlease run markdown-tistory init');
            throw err;
        }

        findMarkdownFile(postToTistory, blogJson, JSON.parse(data).accessToken);
    });
};

const postToTistory = function(markdownFile, blogJson, accessToken){
    const writeUrl = 'https://www.tistory.com/apis/post/write';

    fs.readFile(markdownFile.name, 'utf8', function (err, data) {
        const blogName = blogJson.blogName;
        const targetUrl = blogJson.blogName;
        const title = path.parse(markdownFile.name).name;

        const tokenForSendImage = {
            "accessToken":accessToken,
            "blogName":blogName,
            "targetUrl":targetUrl
        };

        imageConverter.sendImage(data, tokenForSendImage, function (markdown) {
            //const html = githubStyle.apply(converter.makeHtml(markdown));
            const html = converter.makeHtml(markdown);

            const options = {
                url : writeUrl,
                method : 'post',
                form : {
                    "access_token": accessToken,
                    "visibility" : 0,
                    "blogName" : blogName,
                    "targetUrl" : blogName,
                    "title" : title,
                    "content" : html
                }
            };

            request(options, function(error, response, body){
                if(error){
                    throw error;
                }
                if(response.statusCode == 200){
                    print.yellow('Congratulations!! Posted.');
                }else{
                    print.red("code : "+response.statusCode+ " message : "+response.statusMessage);
                }

                process.exit();
            });

        });
    });
};

exports.start = start;

