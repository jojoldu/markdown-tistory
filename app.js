/**
 * Created by jojoldu@gmail.com on 2016-12-13
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

var request = require('request');
var express = require('express');
var open = require('open');
var fs = require('fs');
var path = require('path');
var showdown  = require('showdown'),
    converter = new showdown.Converter();

var clientId;
var clientSecret;
var redirectUri = 'http://localhost:8080/callback';
var jsonPath = '';

var start = function() {
    var args = process.argv;
    if(args[2] == 'write'){
        write();
    }else{
        fs.readFile(jsonPath+'blog.json', 'utf8', function (err, data) {
            if (err) throw err;
            var blog = JSON.parse(data);
            clientId = blog['client_id'];
            clientSecret = blog['secret_key'];

            init();
        });
    }
};

var init = function() {
    var startCallbackServer = function () {
        var app = express();
        app.listen(8080);
        app.get('/callback', function(req, res) {
            var code = req.query.code;

            if(code){
                getAccessToken(code);
            }

        });
    };

    var openGetCode = function(clientId) {
        var parameter = 'client_id='+clientId+'&redirect_uri='+redirectUri+'&response_type=code';
        var authorizeUrl = 'https://www.tistory.com/oauth/authorize?'+parameter;
        open(authorizeUrl);
    };

    var getAccessToken = function(code) {
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
                });
            }
        });

    };

    openGetCode(clientId);
    startCallbackServer();
};

var write = function() {
    var writeUrl = 'https://www.tistory.com/apis/post/write';
    var uploadImageUrl = 'https://www.tistory.com/apis/post/attach';
    var markdown, html;
    fs.readFile('/Users/woowahan/markdown-tistory/마크다운테스트.md', 'utf8', function (err, data) {
        markdown = data;
        html = converter.makeHtml(markdown);
        var options = {
            url : writeUrl,
            method : 'post',
            form : {
                "access_token": accessToken,
                "visibility" : 0,
                "content" = html
            }
        }
    });
};


start();




// var options = {
//     url : 'http://localhost:12002/pay/request',
//     headers: {
//         'Authorization': 'Bearer e7f1970b-68f2-4168-b128-b1239589af08',
//         'Content-Type' : 'application/json'
//     },
//     method : "POST",
//     json : {
//         "serviceId" : "baropay",
//         "site" : "web",
//         "userId" : "1234",
//         "userName" : "이주현",
//         "userEmail" : "이메일",
//         "userIp" : "123.123.123.123",
//         "userTel" : "01072725250",
//         "userAddr": "서울시 송파구 석촌동",
//         "serviceTradeNo" : "14",
//         "amount" : 3000,
//         "itemName" : "닭다리 3인분 abcd test",
//         "merchantKey" : "12345",
//         "returnUrl" : "http://localhost:5000/callback",
//         "resultUrl" : "http://localhost:5000/result",
//         "closeUrl" : "http://betapurch.baemin.com/webview_close",
//         "etc1" : "",
//         "etc2" : "",
//         "etc3" : "",
//         "payDetails" : [
//             {
//                 "payMethod" : "billgatecard",
//                 "amount" : 3000
//             }
//         ]
//     }
// };
//
// request(options, function(error, response, body) {
//     console.log(body);
//     open(body.requestUrl);
// });