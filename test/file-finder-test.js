/**
 * Created by jojoldu@gmail.com on 2017. 9. 9.
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

const fileFinder = require('../lib/file-finder');
const assert  = require('assert');

describe('file-finder 테스트', () => {
    describe('실행위치에서 파일 찾기', () => {
        it('README.md 파일명을 README로 찾는다.', (done) => {
            fileFinder.findMarkdownFile()
                .then((markdownFile) => {
                    assert.equal(markdownFile.title, 'README');
                    done();
                });
        });
    });

    describe('절대 경로 위치에서 파일 찾기', () => {
        it('PARSER.md 파일명을 PARSER로 찾는다.', (done) => {
            fileFinder.findMarkdownFile('/Users/woowahan/Documents/git/markdown-tistory/test/PARSER.md')
                .then((markdownFile) => {
                    assert.equal(markdownFile.title, 'PARSER');
                    done();
                });
        });
    });

    describe('상대 위치에서 파일 찾기', () => {
        it('PARSER.md 파일명을 PARSER로 찾는다.', (done) => {
            fileFinder.findMarkdownFile('./test/PARSER.md')
                .then((markdownFile) => {
                    assert.equal(markdownFile.title, 'PARSER');
                    done();
                });

        });
    });
});
