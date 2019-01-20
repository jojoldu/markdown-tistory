/**
 * Created by jojoldu@gmail.com on 2017-01-02
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

const print = require('./print');
const fileFinder = require('./file-finder');
const tokenManager = require('./token-manager');
const restTemplate = require('./rest-template');
const openInEditor = require('open-in-editor');
const fs = require('fs-extra');

/**
 * todo 티스토리 내용 마크다운 형식으로 다운받기 기능 추가
 */
const start = function() {
    const command = process.argv[2];

    if (command === 'get') {
        const postId = process.argv[3];
        get(postId);
    }
    else if(command === 'write') {
        const filePath = process.argv[3];
        write(filePath);
    } else if (command === 'update') {
        const argument = getUpdateArgument();
        update(argument.filePath, argument.postId);
    } else if(command === 'init') {
        const editor = process.argv[3];
        init(editor);
    }else if(command === 'token') {
        issueToken();
    }else if(command === 'show') {
        const editor = process.argv[3];
        showJson(editor);
    }else if(command === 'ad') {
        const editor = process.argv[3];
        ad(editor);
    }else{
        print.yellow("markdown-tistory \<command\> \ncommand are init, write, token, show \nexample) \n markdown-tistory init \n markdown-tistory write");
        process.exit();
    }
};

const getUpdateArgument = () => {
  if(!process.argv[4]) {
      return {
          filePath: '',
          postId: process.argv[3]
      }
  }

  return {
    filePath: process.argv[3],
    postId: process.argv[4]
  }

};

const get = async (postId) => {
    const tokenJson = await tokenManager.getAccessToken();
    const blogJson = await tokenManager.getBlogJson();
    const blogInfo = await restTemplate.get(blogJson.blogName, postId, tokenJson.accessToken);
    print.gray(JSON.stringify(blogInfo));

    process.exit();
};

const write = async (targetLocation) => {
    const tokenJson = await tokenManager.getAccessToken();
    const blogJson = await tokenManager.getBlogJson();
    const markdownFile = await fileFinder.findMarkdownFile(targetLocation);
    await restTemplate.write(markdownFile, blogJson, tokenJson.accessToken);

    process.exit();
};

const update = async (targetLocation, postId) => {
    const tokenJson = await tokenManager.getAccessToken();
    const blogJson = await tokenManager.getBlogJson();
    const markdownFile = await fileFinder.findMarkdownFile(targetLocation);
    await restTemplate.update(markdownFile, blogJson, tokenJson.accessToken, postId);

    process.exit();
};

const init = function (inputEditor) {
    const editor = createEditor(inputEditor);
    const blogJsonPath = tokenManager.getBlogJsonLocation();

    openFile(blogJsonPath, editor, createBlogJson);
};

const ad = function (inputEditor) {
    const editor = createEditor(inputEditor);
    const adTxtPath = tokenManager.getAdTxtLocation();

    openFile(adTxtPath, editor, createAdsenseCode);
};

const createEditor = function (inputEditor) {
    verifyInputEditor(inputEditor);

    return openInEditor.configure({
        editor: inputEditor
    }, function(err) {
        print.red('Something went wrong: ' + err);
    });
};

const verifyInputEditor = function (inputEditor) {
    const EDITORS = [
        'sublime',
        'atom',
        'code',
        'vim',
        'emacs'
    ];

    if (!inputEditor) {
        print.red('Not Input. Retry!');
        print.red(JSON.stringify(EDITORS));
        process.exit();
    }

    if (!EDITORS.includes(inputEditor)) {
        print.red('Bad Input. Retry!');
        print.red(JSON.stringify(EDITORS));
        process.exit();
    }
};

function openFile(filePath, editor, notExistCallback) {
    fs.pathExists(filePath)
        .then((isExist) => {
            if (isExist) {
                editor.open(filePath)
                    .then(()=>{
                    });
            } else {
                notExistCallback(editor, filePath);
            }
        })
}

function createBlogJson(editor, filePath) {
    const content = '{\n' +
        '   "blogName":"", \n' +
        '   "clientId":"", \n' +
        '   "secretKey":"", \n' +
        '   "adsenseCode":"광고스크립트 코드에서 쌍따옴표는 모두 홀따옴표로 변경해서 등록하셔야 문자열 파싱 에러가 발생하지 않습니다." \n' +
        '}';

    tokenManager.saveBlogJson(content)
        .then(() => {
            editor.open(filePath)
                .then(() => {
                    print.yellow('Open blog.json \nTry markdown-tistory token');
                });
        })
        .catch((err) => {
            print.red('Cannot Open File: ' + err);
            process.exit();
        });
}

const createAdsenseCode = function (editor, filePath) {
    return fs.writeFile(filePath, '', 'utf8')
        .then(()=>{
            editor.open(filePath)
                .then(() => {
                    print.yellow('Open ad.txt');
                });
        })
        .catch((err)=>{
            print.red('An Error occurred while Saving ad.txt');
            throw err;
        })
};

const issueToken = function () {
    tokenManager.getBlogJson()
        .then((blogJson)=>{
            tokenManager.saveAccessToken(blogJson);
        });
};

const showJson = function (inputEditor) {
    const editor = createEditor(inputEditor);
    const blogJsonPath = tokenManager.getBlogJsonLocation();

    openFile(blogJsonPath, editor, ()=> {
        print.red('Not Found blog.json.\nPlease execute Command: markdown-tistory init ');
        process.exit();
    });
};



exports.start = start;

