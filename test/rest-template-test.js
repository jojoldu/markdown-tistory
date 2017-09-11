/**
 * Created by jojoldu@gmail.com on 2017. 9. 10.
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

const restTemplate = require('../lib/rest-template');
const tokenManager = require('../lib/token-manager');
const assert = require('assert');

describe('rest-template', ()=> {
    describe('uploadContent로 블로그에 포스팅된다', () => {
        it('README.md의 내용이 포스팅 된다.', (done) => {
            const markdown = '### Hello jojoldu World';
            const blogName = 'jojoldu';
            const title = 'Hello jojoldu World';

            tokenManager.getAccessToken()
                .then((accessToken) => {
                    return restTemplate.uploadContent(markdown, accessToken, blogName, title);
                })
                .then((response) => {
                    assert.equal(response.statusCode, 200);
                    done();
                });
        });
    });

    describe('write로 블로그에 포스팅된다', () => {
        it('markdownFile, blogJson, accessToken이 모두 필요하다.', (done) => {
        });
    });
});