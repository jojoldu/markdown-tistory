/**
 * Created by jojoldu@gmail.com on 2017. 9. 10.
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

const requestPromise = require('request-promise');
const express = require('express');
const browserOpen = require('open');
const fs = require('fs-extra');
const path = require('path');

const print = require('./print');
const pathFinder = require('./path-finder');

const REDIRECT_URI = 'http://localhost:5000/callback';
const ROOT_PATH = path.join(pathFinder.getJsonPath(), "/");

/**
 * blogJson
 {
    "blogName":"",
    "clientId":"",
    "secretKey":""
 }
 * @param blogJson
 */

exports.getBlogJson = function () {
    return getJsonFromLocalFile('blog');
};

exports.getAccessToken = function () {
    return getJsonFromLocalFile('token');
};

exports.getAdTxt = function () {
    const adTxtPath = ROOT_PATH+'ad.txt';

    return fs.exists(adTxtPath)
        .then((isExist)=>{
            if(isExist){
                return fs.readFile(adTxtPath, 'utf8')
                    .then((data) => {
                        return new Promise((resolve) => {
                            resolve(data);
                        });
                    })
                    .catch((err)=> {
                        print.red('There is no ad.txt ' + '\nPlease run markdown-tistory ad');
                        print.red(err);
                        process.exit();
                    });
            } else {
                return new Promise((resolve)=>{
                    resolve(false);
                });
            }
        });
};

exports.getBlogJsonLocation = function () {
    return ROOT_PATH + 'blog.json';
};

exports.getAdTxtLocation = function () {
    return ROOT_PATH + 'ad.txt';
};

const getJsonFromLocalFile = function (fileName) {
    return fs.readFile(ROOT_PATH+fileName+'.json', 'utf8')
        .then((data) => {
            return new Promise((resolve) => {
                resolve(JSON.parse(data));
            });
        })
        .catch((err)=> {
            print.red('There is no '+ fileName + '. \nPlease run markdown-tistory init');
            print.red(err);
            process.exit();
        });
};

exports.saveBlogJson = function (blogJson) {
    const content = (typeof blogJson)==='string'? blogJson: JSON.stringify(blogJson);

    return fs.writeFile(ROOT_PATH + 'blog.json', content, 'utf8')
        .then(() => {
            return new Promise((resolve)=>{
                resolve(blogJson);
            });
        })
        .catch((err) => {
            print.red('An error occurred while issuing blog.json ');
            throw err;
        });
};

exports.saveAccessToken = function(blogJson) {
    startCallbackServer(blogJson, writeToken);
    getAuthorizationCode(blogJson);
};

const startCallbackServer = function (blogJson, callback) {
    let app = express();
    app.listen(5000);
    app.get('/callback', (req) => {
        const code = req.query.code;
        if(code){
            getAccessTokenByCode(code, blogJson)
                .then((accessToken)=>{
                    callback(accessToken);
                })
                .catch(()=>{
                    process.exit();
                })
        } else {
            print.red('Failed get Authorization Code');
            process.exit();
        }
    });
};

const getAuthorizationCode = function(blogJson) {
    const parameter = 'response_type=code&client_id='+blogJson.clientId+'&redirect_uri='+REDIRECT_URI;
    const authorizeUrl = 'https://www.tistory.com/oauth/authorize?'+parameter;
    browserOpen(authorizeUrl);
};

const getAccessTokenByCode = function(code, blogJson) {
    const clientId = blogJson.clientId;
    const clientSecret = blogJson.secretKey;
    const parameter = 'client_id='+clientId+'&client_secret='+clientSecret+'&redirect_uri='+REDIRECT_URI+'&code='+code+'&grant_type=authorization_code';

    const options = {
        url : 'https://www.tistory.com/oauth/access_token?'+parameter,
        method : 'get'
    };

    return requestPromise(options)
        .then((response) => {
            const responseBody = response.split('=');
            if(responseBody[0] === 'error') {
                print.red('There was a problem in requesting access token from the Tistory API.\n'+responseBody[1]);
                process.exit();
            }

            return responseBody[1];
        })
        .catch((err) => {
            print.red('There was a problem in requesting access token from the Tistory API');
            throw err;
        });
};

const writeToken = function(accessToken) {
    fs.writeFile(ROOT_PATH + 'token.json', JSON.stringify({"accessToken": accessToken}), 'utf8')
        .then(()=> {
            print.yellow('Access token issued.');
            process.exit();
        })
        .catch((err)=>{
            print.red('There was a problem creating the access token file.\n');
            throw err;
        });
};
