/**
 * Created by jojoldu@gmail.com on 2016-12-13
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

var request = require('request');
var express = require('express');
var open = require('open');

var clientId;
var clientSecret;
var redirectUri = 'http://localhost:8080/callback';

var start = function() {

    var args = process.argv;
    var isValidCommand = function () {
        if(args.length <= 2) {
            return false;
        }

        if(args[2] == 'write'){
            return true;
        }else if(args[2] == 'init'){
            if(args.length > 4){
                return true;
            }
        }

        return false;
    };

    if(!isValidCommand()){
        console.log('도움말 출력');
        process.exit();
    }

    var command = args[2];
    if(command == 'write'){

    }else if(command == 'init'){
        clientId = args[3];
        clientSecret = args[4];
        init(clientId);
    }
};

var init = function(clientId) {
    var startCallbackServer = function () {
        var app = express();
        app.listen(8080);
        app.get('/callback', function(req, res) {
            console.log(req);
            var code = req.query.code;

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
            console.log(body);
            open(body.requestUrl);
        });

    };

    openGetCode(clientId);
    startCallbackServer();
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