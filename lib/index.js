/**
 * Created by jojoldu@gmail.com on 2017-01-02
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

var imageConverter = require('./image-converter');

var request = require('request');
var express = require('express');
var open = require('open');
var fs = require('fs');
var path = require('path');
var showdown  = require('showdown'),
    converter = new showdown.Converter();
var readline = require('readline'),
    r = readline.createInterface({input:process.stdin, output:process.stdout});

var redirectUri = 'http://localhost:5000/callback';
var jsonPath = path.join(__dirname, '../');

var start = function() {
    var command = process.argv[2];
    console.log('0: '+process.argv[0] + ' 1: '+process.argv[1]+ ' 2: '+process.argv[2]);
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

var init = function () {
    var messages = [
        {prop: "blogName", question:"blog 이름을 입력하세요 (ex: xxx.tistory.com의 xxx) : ", answer:""},
        {prop: "clientId", question:"client id를 입력하세요 : ", answer:""},
        {prop: "secretKey", question:"secreate key를 입력하세요 : ", answer:""}
    ];

    var index = 0;
    var recursiveAsyncReadLine = function () {
        r.question(messages[index].question, function (answer) {
            console.log(answer);
            messages[index].answer = answer;

            if(index == messages.length-1){
                var blogJson = {};
                for(var i=0, length=messages.length; i<length; i++){
                    var message = messages[i];
                    blogJson[message.prop] = message.answer;
                }
                fs.writeFile(jsonPath+'blog.json', JSON.stringify(blogJson), 'utf8', function(err){
                    console.log('blog 정보 입력 완료\naccessToken 발급 진행');

                    process.exit();
                });
                return r.close();
            }

            index++;
            recursiveAsyncReadLine();
        });
    };

    recursiveAsyncReadLine();
};

var getToken = function () {
    getBlogJson(downloadAccessToken);
};

var getBlogJson = function (callback) {
    fs.readFile(jsonPath+'blog.json', 'utf8', function (err, data) {
        if (err) {
            console.log('blog정보가 없습니다. \nmarkdown-tistory init 을 실행시켜 주세요');
            throw err;
        }
        callback(JSON.parse(data));
    });
};

var showJson = function () {
    getBlogJson(function(data) {
        console.log(JSON.stringify(data))
    });


};

var downloadAccessToken = function(blogJson) {

    var startCallbackServer = function (blogJson) {
        var app = express();
        app.listen(5000);
        app.get('/callback', function(req, res) {
            var code = req.query.code;

            if(code){
                getAccessToken(code, blogJson);
            }

        });
    };

    var openGetCode = function(blogJson) {
        var clientId = blogJson['clientId'];
        var parameter = 'client_id='+clientId+'&redirect_uri='+redirectUri+'&response_type=code';
        var authorizeUrl = 'https://www.tistory.com/oauth/authorize?'+parameter;
        open(authorizeUrl);
    };

    var getAccessToken = function(code, blogJson) {
        var clientId = blogJson['clientId'];
        var clientSecret = blogJson['clientSecret'];
        var parameter = 'client_id='+clientId+'&client_secret='+clientSecret+'&redirect_uri='+redirectUri+'&code='+code+'&grant_type=authorization_code';

        var options = {
            url : 'https://www.tistory.com/oauth/access_token?'+parameter,
            method : 'get'
        };

        request(options, function(error, response, body) {
            if(error){
                throw error;
            }
            var accessToken = body.split('=')[1];
            if(accessToken){
                fs.writeFile(jsonPath+'token.json', JSON.stringify({"accessToken":accessToken}), 'utf8', function(err){
                    console.log('access token 발급 완료');
                    process.exit();
                });
            }
        });


    };
    openGetCode(blogJson);

    startCallbackServer(blogJson);
};

var findMarkdownFile = function (callback) {
    var dir = process.cwd();
    var files = fs.readdirSync(dir);
    var markdownFileName;

    for(var i=0,length=files.length;i<length;i++) {
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

        callback(markdownFile);
    });
};

var write = function() {
    getBlogJson(posting);
};

var posting = function (blogJson) {
    var writeUrl = 'https://www.tistory.com/apis/post/write';
    fs.readFile(jsonPath+'token.json', 'utf8', function (err, data) {
        if (err) {
            console.log('token 정보가 없습니다.');
            throw err;
        }
        var token = JSON.parse(data);
        var accessToken = token.accessToken;

        findMarkdownFile(function(markdownFile){

            fs.readFile(markdownFile.name, 'utf8', function (err, data) {
                var blogName = blogJson.blogName;
                var targetUrl = blogJson.targetUrl;
                var title = path.parse(markdownFile.name).name;

                var tokenForSendImage = {
                    "accessToken":accessToken,
                    "blogName":blogName,
                    "targetUrl":targetUrl
                };

                imageConverter.sendImage(data, tokenForSendImage, function (markdown) {
                    var html = converter.makeHtml(markdown);
                    var options = {
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
        });
    });
};

exports.start = start;

