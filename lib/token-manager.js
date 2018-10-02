/**
 * Created by jojoldu@gmail.com on 2017. 9. 10.
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

const requestPromise = require('request-promise');
const express = require('express');
const browserOpen = require('opn');
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

exports.getBlogJson = () => {
    return getJsonFromLocalFile('blog');
};

exports.getAccessToken = () => {
    return getJsonFromLocalFile('token');
};

exports.getAdTxt = async () => {
    const adTxtPath = ROOT_PATH + 'ad.txt';
    const isExist = await fs.exists(adTxtPath);
    return getAdCode(isExist, adTxtPath);
};

const getAdCode = async (isExist, adTxtPath) => {
    if (isExist) {
        try {
            const adCode = await fs.readFile(adTxtPath, 'utf8');
            return new Promise((resolve) => {
                resolve(adCode);
            });
        } catch (err) {
            print.red('There is no ad.txt ' + '\nPlease run markdown-tistory ad');
            print.red(err);
            process.exit();
        }

    } else {
        return new Promise((resolve) => {
            resolve(false);
        });
    }
};

exports.getBlogJsonLocation = () => {
    return ROOT_PATH + 'blog.json';
};

exports.getAdTxtLocation = () => {
    return ROOT_PATH + 'ad.txt';
};

const getJsonFromLocalFile = async (fileName) => {
    try {
        const jsonData = await fs.readFile(ROOT_PATH + fileName + '.json', 'utf8');
        return new Promise((resolve) => {
            resolve(JSON.parse(jsonData));
        });
    } catch (err) {
        print.red('There is no ' + fileName + '. \nPlease run markdown-tistory init');
        print.red(err);
        process.exit();
    }
};

exports.saveBlogJson = async (blogJson) => {
    const content = (typeof blogJson) === 'string' ? blogJson : JSON.stringify(blogJson);
    try {
        const blogJsonData = await fs.writeFile(ROOT_PATH + 'blog.json', content, 'utf8');
        return new Promise((resolve) => {
            resolve(blogJsonData);
        });

    } catch (err) {
        print.red('An error occurred while issuing blog.json ');
        throw err;
    }
};

exports.saveAccessToken = (blogJson) => {
    startCallbackServer(blogJson, writeToken);
    getAuthorizationCode(blogJson);
};

const startCallbackServer = (blogJson, callback) => {
    let app = express();
    app.listen(5000);
    app.get('/callback', async (req, res) => {
        const code = req.query.code;
        if (code) {
            const accessToken = await getAccessTokenByCode(code, blogJson);
            callback(accessToken);
            res.write('<script>alert("Access token was taken")</script>')
            res.send();
        } else {
            print.red('Failed get Authorization Code');
            process.exit();
        }
    });
};

const getAuthorizationCode = (blogJson) => {
    const parameter = 'response_type=code&client_id=' + blogJson.clientId + '&redirect_uri=' + REDIRECT_URI;
    const authorizeUrl = 'https://www.tistory.com/oauth/authorize?' + parameter;
    browserOpen(authorizeUrl);
};

const getAccessTokenByCode = async (code, blogJson) => {
    const clientId = blogJson.clientId;
    const clientSecret = blogJson.secretKey;
    const parameter = 'client_id=' + clientId + '&client_secret=' + clientSecret + '&redirect_uri=' + REDIRECT_URI + '&code=' + code + '&grant_type=authorization_code';

    const options = {
        url: 'https://www.tistory.com/oauth/access_token?' + parameter,
        method: 'get'
    };

    try {
        const response = await requestPromise(options);
        const responseBody = response.split('=');
        if (responseBody[0] === 'error') {
            print.red('There was a problem in requesting access token from the Tistory API.\n' + responseBody[1]);
            process.exit();
        }

        return responseBody[1];
    } catch (err) {
        print.red('There was a problem in requesting access token from the Tistory API');
        throw err;
    }
};

const writeToken = async (accessToken) => {
    try {
        await fs.writeFile(ROOT_PATH + 'token.json', JSON.stringify({"accessToken": accessToken}), 'utf8');
        print.yellow('Access token issued.');
        process.exit();
    } catch (err) {
        print.red('There was a problem creating the access token file.\n');
        throw err;
    }
};
