/**
 * Created by jojoldu@gmail.com on 2017. 9. 8.
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */
const fs = require('fs');
const path = require('path');
const print = require('./print');
const NOT_FOUND_FILE = 'There are no Markdown files in the current folder.';

exports.findMarkdownFile = function (callback, inputName) {
    const dir = process.cwd();
    const markdownFileName = getFileName(inputName);

    fs.readFile(markdownFileName, 'utf8', function (err, data) {
        const markdownFile = {
            "name":dir+"/"+markdownFileName,
            "data":data
        };

        callback(markdownFile);
    });
};

const getFileName = function (inputName) {
    return inputName? inputName : searchFile();
};

const searchFile = function() {
    const dir = process.cwd();
    const files = fs.readdirSync(dir);
    let markdownFileName;

    for (let i = 0, length = files.length; i < length; i++) {
        if (path.extname(files[i]) === '.md') {
            markdownFileName = files[i];
            break;
        }
    }

    if(!markdownFileName){
        print.red(NOT_FOUND_FILE);
        throw new Error(NOT_FOUND_FILE);
    }

    return markdownFileName;
};
