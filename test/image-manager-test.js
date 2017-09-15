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
        const markdownPath = '/Users/woowahan/Documents/git/markdown-tistory/test/PARSER.md';

        it('상대경로는 마크다운 파일 기준으로 계산한다', ()=>{
            const image = '../images/tistory.png';
            const result = imageManager.exchangeRealPath(image, markdownPath);
            assert.equal(result, '/Users/woowahan/Documents/git/markdown-tistory/images/tistory.png');
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
    });

    describe('티스토리에 이미지가 업로드 된다', ()=>{
        it('업로드된 이미지 URL로 마크다운 이미지가 변경된다', (done)=>{
            const markdownText = '![티스토리 클라이언트](./images/티스토리클라이언트.png)';
            const blogName = 'jojoldu';
            const targetUrl = 'jojoldu';

            tokenManager.getAccessToken()
                .then((tokenJson)=>{
                    const param = {
                        accessToken: tokenJson.accessToken,
                        blogName: blogName,
                        targetUrl: targetUrl
                    };
                    return imageManager.exchange(markdownText, param);
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
});