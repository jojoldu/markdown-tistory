/**
 * Created by jojoldu@gmail.com on 2017-01-02
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

const print = require('./print');
const reader = require('./reader');
const fileFinder = require('./file-finder');
const tokenManager = require('./token-manager');
const restTemplate = require('./rest-template');
const openInEditor = require('open-in-editor');
const fs = require('fs-extra');


const start = function() {
    const command = process.argv[2];

    if(command === 'write') {
        const filePath = process.argv[3];
        write(filePath);
    }else if(command === 'init') {
        const editor = process.argv[3];
        init(editor);
    }else if(command === 'token') {
        issueToken();
    }else if(command === 'show') {
        showJson();

    }else if(command === 'ad') {

        /**
         * todo 티스토리 내용 마크다운 형식으로 다운받기 기능 추가
         */
    }else if(command === 'read') {
        const postId = process.argv[3];
        if(postId){
            reader.writeMarkdownById(postId);
        }else{
            print.red('This input is not invalid. \nPlease enter only numbers.');
        }
    }else{
        print.yellow("markdown-tistory \<command\> \ncommand are init, write, token, show \nexample) \n markdown-tistory init \n markdown-tistory write");
        process.exit();
    }
};

const init = function (inputEditor) {
    const EDITORS = [
        'sublime',
        'atom',
        'code',
        'vim',
        'emacs'
    ];

    verifyInputEditor(inputEditor, EDITORS);

    const editor = createEditor(inputEditor);
    const blogJsonLocation = tokenManager.getBlogJsonLocation();

    openBlogJson(blogJsonLocation, editor);
};

function verifyInputEditor(inputEditor, EDITORS) {
    if (!inputEditor) {
        print.red('Not Input. Retry!');
        process.exit();
    }

    if (!EDITORS.includes(inputEditor)) {
        print.red('Bad Input. Retry!');
        process.exit();
    }
}

function openBlogJson(blogJsonLocation, editor) {
    fs.pathExists(blogJsonLocation)
        .then((isExist) => {
            if (isExist) {
                editor.open(blogJsonLocation)
                    .then(()=>{
                    });
            } else {
                const content = '{\n' +
                                '   "blogName":"", \n' +
                                '   "clientId":"", \n' +
                                '   "secretKey":"", \n' +
                                '   "adsenseCode":"광고스크립트 코드에서 쌍따옴표는 모두 홀따옴표로 변경해서 등록하셔야 문자열 파싱 에러가 발생하지 않습니다." \n' +
                                '}';

                tokenManager.saveBlogJson(content)
                    .then(() => {
                        editor.open(blogJsonLocation)
                            .then(()=>{
                                print.yellow('Open blog.json \nTry markdown-tistory token');
                            });
                    })
                    .catch((err)=>{
                        print.red('Cannot Open File: '+err);
                        process.exit();
                    });
            }
        })
}

const createEditor = function (inputEditor) {
    return openInEditor.configure({
        editor: inputEditor
    }, function(err) {
        print.red('Something went wrong: ' + err);
    });
};

const issueToken = function () {
    tokenManager.getBlogJson()
        .then((blogJson)=>{
            tokenManager.saveAccessToken(blogJson);
        });
};

const showJson = function () {
    tokenManager.getBlogJson()
        .then((blogJson)=>{
            print.red(JSON.stringify(blogJson));
            process.exit();
        });
};

const write = function(targetLocation) {
    let blogJson;
    let accessToken;

    tokenManager.getAccessToken()
        .then((json)=>{
            accessToken = json.accessToken;
            return tokenManager.getBlogJson();
        })
        .then((json) => {
            blogJson = json;
            return fileFinder.findMarkdownFile(targetLocation);
        })
        .then((markdownFile)=>{
            return restTemplate.write(markdownFile, blogJson, accessToken);
        })
        .then(()=>{
            process.exit();
        })
        .catch((err)=>{
            throw err;
        });

};

exports.start = start;

