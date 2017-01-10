/**
 * Created by jojoldu@gmail.com on 2017-01-02
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

const imageConverter = require('./image-converter');

const request = require('request');
const express = require('express');
const open = require('open');
const fs = require('fs');
const path = require('path');
const showdown  = require('showdown'),
    converter = new showdown.Converter();
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
    }else{
        console.log("markdown-tistory \<command\> 형식으로 입력해주세요 \ncommand는 init, write, token을 사용할 수 있습니다. \n예) \n markdown-tistory init \n markdown-tistory write");
        process.exit();
    }
};

const init = function () {
    const messages = [
        {prop: "blogName", question:"blog 이름을 입력하세요 (ex: xxx.tistory.com의 xxx) : ", answer:""},
        {prop: "clientId", question:"client id를 입력하세요 : ", answer:""},
        {prop: "secretKey", question:"secreate key를 입력하세요 : ", answer:""}
    ];

    let index = 0;
    const recursiveAsyncReadLine = function () {
        r.question(messages[index].question, function (answer) {
            messages[index].answer = answer;

            if(index == messages.length-1){
                let blogJson = {};
                for(let i=0, length=messages.length; i<length; i++){
                    let message = messages[i];
                    blogJson[message.prop] = message.answer;
                }
                fs.writeFile(jsonPath+'blog.json', JSON.stringify(blogJson), 'utf8', function(err){
                    if(err){
                        console.log('blog.json 발급 중 오류가 발생하였습니다.');
                        throw err;
                    }
                    console.log('blog 정보 입력 완료\naccessToken 발급 진행');
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
            console.log('blog정보가 없습니다. \nmarkdown-tistory init 을 실행시켜 주세요');
            throw err;
        }
        callback(JSON.parse(data));
    });
};

const showJson = function () {
    getBlogJson(function(data) {
        console.log(JSON.stringify(data))
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
                console.log('티스토리에 access token을 요청하는 과정에서 문제가 발생하였습니다');
                throw error;
            }
            if(bodyParsing[0] == 'error') {
                console.log('티스토리에 access token을 요청하는 과정에서 문제가 발생하였습니다.\n'+bodyParsing[1]);
                process.exit();
            }

            const accessToken = bodyParsing[1];
            if(accessToken){
                fs.writeFile(jsonPath+'token.json', JSON.stringify({"accessToken":accessToken}), 'utf8', function(err){
                    if(err) {
                        console.log('access token 파일 생성 중 문제가 발생하였습니다.\n');
                        throw err;
                    }
                    console.log('access token 발급 완료');
                    process.exit();
                });
            }
        });
    };
    openGetCode(blogJson);

    startCallbackServer(blogJson);
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
        console.log('현재 폴더에는 마크다운 파일이 없습니다.');
    }
};

const write = function() {
    getBlogJson(posting);
};

const posting = function (blogJson) {

    fs.readFile(jsonPath+'token.json', 'utf8', function (err, data) {
        if (err) {
            console.log('token 정보가 없습니다. \nmarkdown-tistory init 을 실행시켜 주세요');
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
                    console.log('포스팅 되었습니다.');
                }else{
                    console.log("code : "+response.statusCode+ " message : "+response.statusMessage);
                }

                process.exit();
            });

        });
    });
};

exports.start = start;

