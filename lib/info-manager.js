
const fs = require('fs');
const path = require('path');
const jsonPath = path.join(__dirname, "../");

const getAccessToken = function (callback) {
    fs.readFile(jsonPath + 'token.json', 'utf8', function (err, data) {
        if (err) {
            console.log('There is no access token information \nPlease run markdown-tistory init');
            throw err;
        }

        callback(JSON.parse(data).accessToken);
    });
};

const getBlogInfo =  function (callback) {
    fs.readFile(jsonPath + 'blog.json', 'utf8', function (err, data) {
        if (err) {
            console.log('There is no blog information. \nPlease run markdown-tistory init');
            throw err;
        }
        callback(JSON.parse(data));
    });
};

exports.getAccessToken = getAccessToken;
exports.getBlogInfo = getBlogInfo;


