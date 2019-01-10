/**
 * Created by jojoldu@gmail.com on 2017. 9. 11.
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

const imageManager = require('../lib/image-manager');
const tokenManager = require('../lib/token-manager');

const assert = require('assert');

describe('image-manager', ()=>{
    describe('텍스트내 이미지 Path', ()=>{
        const markdownPath = '/Users/jojoldu/Documents/git/markdown-tistory/test/PARSER.md';

        it('상대경로는 마크다운 파일 기준으로 계산한다', ()=>{
            const image = '../images/tistory.png';
            const result = imageManager.exchangeRealPath(image, markdownPath);
            assert.equal(result, '/Users/jojoldu/Documents/git/markdown-tistory/images/tistory.png');
        });

        it('Path의 마지막 파일명을 추출한다', ()=>{
            const parse = markdownPath.split("\/");
            assert.equal(parse[parse.length-1], 'PARSER.md');
        });

        it('.으로 시작하는 Path', ()=>{
            const path = './image/tistory.png';
            const parentPath = '../images/tistory.png';
            assert.ok(path.startsWith('\.'));
            assert.ok(parentPath.startsWith('\.'));
        });

        it('파일명이 있는 이미지도 뽑아낼수 있다', ()=>{
            const markdownText = '![티스토리클라이언트](../images/티스토리클라이언트.png)';
            const result = imageManager.getImages(markdownText);
            assert.equal(result, markdownText);
        });

        it('파일명이 없는 이미지도 뽑아낼수 있다', ()=>{
            const markdownText = '![](../images/티스토리클라이언트.png)';
            const markdownTextAddition = 'aaa';
            const result = imageManager.getImages(markdownText+markdownTextAddition);
            assert.equal(result, markdownText);
        });
    });

    describe('티스토리에 이미지가 업로드 된다', ()=>{
        const markdownPath = '/Users/jojoldu/Documents/git/markdown-tistory/test/PARSER.md';

        it('업로드된 이미지 URL로 마크다운 이미지가 변경된다', (done)=>{
            const markdownText = '![티스토리 클라이언트](../images/티스토리클라이언트.png)';
            const blogName = 'jojoldu';
            const targetUrl = 'jojoldu';

            tokenManager.getAccessToken()
                .then((tokenJson)=>{
                    const param = {
                        accessToken: tokenJson.accessToken,
                        blogName: blogName,
                        targetUrl: targetUrl
                    };
                    return imageManager.exchange(markdownPath, markdownText, param);
                })
                .then((replacedImageUrl)=>{
                    assert.ok(replacedImageUrl.includes('tistory.com'));
                    done();
                })
                .catch((err)=>{
                    done();
                    throw err;
                });
        });

        it('파일명이 없는 마크다운 이미지가 변경된다', (done)=>{
            const markdownText = '![](../images/티스토리클라이언트.png)';
            const blogName = 'jojoldu';
            const targetUrl = 'jojoldu';

            tokenManager.getAccessToken()
                .then((tokenJson)=>{
                    const param = {
                        accessToken: tokenJson.accessToken,
                        blogName: blogName,
                        targetUrl: targetUrl
                    };
                    return imageManager.exchange(markdownPath, markdownText, param);
                })
                .then((replacedImageUrl)=>{
                    assert.ok(replacedImageUrl.includes('tistory.com'));
                    done();
                })
                .catch((err)=>{
                    done();
                    throw err;
                });
        });
    });

    describe('removeFileName을 사용하면 파일 이름을 제외한 나머지 주소가 전달된다', ()=>{
        it('파일명만 입력되면 현재위치를 기준으로 한다', () => {
            const filePath = 'README.md';
            const result = imageManager.removeFileName(filePath);
            assert.equal(result, './');
        });

        it('파일위치가 입력되면 파일명을 제외한 나머지 Path가 전달된다', () => {
            const prefix = '/Users/jojoldu/Documents/git/markdown-tistory/';
            const filePath = prefix + 'README.md';
            const result = imageManager.removeFileName(filePath);
            assert.equal(result, prefix);
        });
    });
});