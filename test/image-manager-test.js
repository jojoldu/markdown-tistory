/**
 * Created by jojoldu@gmail.com on 2017. 9. 11.
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

const imageConverter = require('../lib/image-manager');
const tokenManager = require('../lib/token-manager');

const assert = require('assert');

describe('image-converter', ()=>{
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
                    return imageConverter.exchange(markdownText, param);
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