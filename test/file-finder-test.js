/**
 * Created by jojoldu@gmail.com on 2017. 9. 9.
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

const fileFinder = require('../lib/file-finder');
const assert  = require('assert');

describe('file-finder 테스트', function() {
    describe('실행위치에서 파일 찾기', function() {
        it('README.md 파일명을 README로 찾는다.', function(done) {
            fileFinder.findMarkdownFile((markdownFile) => {
                assert.equal(markdownFile.title, 'README');
                done();
            });
        });
    });

    describe('절대 경로 위치에서 파일 찾기', function() {
        it('PARSER.md 파일명을 PARSER로 찾는다.', function(done) {
            fileFinder.findMarkdownFile((markdownFile) => {
                assert.equal(markdownFile.title, 'PARSER');
                done();
            },'/Users/woowahan/Documents/git/markdown-tistory/test/PARSER.md');
        });
    });

    describe('상대 위치에서 파일 찾기', function() {
        it('PARSER.md 파일명을 PARSER로 찾는다.', function(done) {
            fileFinder.findMarkdownFile((markdownFile) => {
                assert.equal(markdownFile.title, 'PARSER');
                done();
            },'./test/PARSER.md');
        });
    });
});
