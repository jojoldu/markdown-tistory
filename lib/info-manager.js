/**
 * Created by jojoldu@gmail.com on 2017-01-09
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

const print = require('./print');
const fs = require('fs-extra');
const path = require('path');
const jsonPath = path.join(__dirname, "../");

const getAccessToken = async (callback) => {
    try {
        const tokenJson = await fs.readFile(jsonPath + 'token.json', 'utf8');
        callback(JSON.parse(tokenJson).accessToken);
    } catch (err) {
        print.red('There is no access token information \nPlease run markdown-tistory init');
        throw err;
    }
};

const getBlogInfo = (callback) => {
    fs.readFile(jsonPath + 'blog.json', 'utf8', (err, data) => {
        if (err) {
            print.red('There is no blog information. \nPlease run markdown-tistory init');
            throw err;
        }
        callback(JSON.parse(data));
    });
};

exports.getAccessToken = getAccessToken;
exports.getBlogInfo = getBlogInfo;


