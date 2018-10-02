/**
 * Created by jojoldu@gmail.com on 2017. 9. 9.
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

const fileFinder = require('../lib/file-finder');
const assert  = require('assert');
const fs = require('fs')

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

    describe('상대 위치에서 파일 찾기', () => {
        it('PARSER.md 파일명을 PARSER로 찾는다.', (done) => {
            fileFinder.findMarkdownFile('./test/PARSER.md')
                .then((markdownFile) => {
                    assert.equal(markdownFile.title, 'PARSER');
                    done();
                });
        });
    });
    describe('상대적으로 새로운 파일 찾기', ()=>{
        before('test 실행 위치에서 실행되므로, \
            test의 Z_Newest_File.md를 test 실행 위치로 옮긴다',()=>{
                fs.createReadStream('README.md').pipe(fs.createWriteStream('newREADME.md'));
            });
        
        it('새로 복사된 newREADME를 찾는다', (done) => {
            fileFinder.findMarkdownFileNewest()
                .then((markdownFile) => {
                    assert.equal(markdownFile.title, 'newREADME');
                    done();
            });
        });

        after('완료 후 복사한 RENAME.md를 지운다', ()=>{
            fs.unlinkSync('newREADME.md');
        });
    });
});
