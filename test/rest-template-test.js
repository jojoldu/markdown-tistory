/**
 * Created by jojoldu@gmail.com on 2017. 9. 10.
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

const restTemplate = require('../lib/rest-template');
const tokenManager = require('../lib/token-manager');
const assert = require('assert');

describe('블로그에 포스팅된다', () => {
    const MARKDOWN_TEXT = '### Hello jojoldu World';
    const MARKDOWN_TITLE = 'Hello jojoldu World';
    const BLOG_NAME = 'jojoldu';
    const TARGET_URL = 'jojoldu';

    it('README.md의 내용이 포스팅 된다.', (done) => {
        tokenManager.getAccessToken()
            .then((json) => {
                const parameters = {
                    accessToken: json.accessToken,
                    blogName:BLOG_NAME,
                    targetUrl:TARGET_URL
                };
                return restTemplate.uploadContent(MARKDOWN_TEXT, MARKDOWN_TITLE, parameters);
            })
            .then((response) => {
                assert.equal(response.status[0], 200);
                done();
            });
    });

    it('markdownText, blogJson, accessToken이 모두 필요하다.', (done) => {
        tokenManager.getAccessToken()
            .then((json)=>{
                const blogJson = {
                    blogName:BLOG_NAME,
                    targetUrl:TARGET_URL
                };
                const markdownFile = {
                    title:MARKDOWN_TITLE,
                    data: MARKDOWN_TEXT
                };

                return restTemplate.write(markdownFile, blogJson, json.accessToken);
            })
            .then((response) => {
                assert.equal(response.status[0], 200);
                done();
            });
    });
});
