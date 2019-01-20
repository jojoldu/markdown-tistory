/**
 * Created by jojoldu@gmail.com on 2017. 9. 8.
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */
const fs = require("fs-extra");
const path = require("path");
const print = require("./print");

const NOT_FOUND_FILE = "There are no Markdown files in the current folder.";

exports.findMarkdownFile = async (targetLocation) => {
    const markdownMeta = getFileMeta(targetLocation);
    const data = await fs.readFile(markdownMeta.location, 'utf8');
    return {
        "title": markdownMeta.title,
        "location": markdownMeta.location,
        "data": data
    };
};

exports.findFileFromCurrent = async (relativePath) => {
    const currentPath = process.cwd();
    const fullPath = path.join(currentPath+'/'+relativePath);
    return await fs.readFile(fullPath, 'utf8');
};

const getFileMeta = (inputLocation) => {
    const fileLocation = getFileLocation(inputLocation);
    const fileName = getFileName(fileLocation);

    return {
        location: fileLocation,
        title: fileName
    };
};

const getFileName = (markdownFileName) => {
    const removedExt = markdownFileName.slice(0, markdownFileName.length-3);
    return path.parse(removedExt).name;
};

const getFileLocation = (inputLocation) => {
    return inputLocation? inputLocation : searchInCurrent();
};

const searchInCurrent = () => {
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

    return dir+'/'+markdownFileName;
};
