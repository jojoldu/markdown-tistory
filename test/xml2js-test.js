/**
 * Created by jojoldu@gmail.com on 2017. 9. 9.
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

const parseString = require('xml2js').parseString;
const assert  = require('assert');

describe('xml2js 테스트', () => {
    describe('accessToken이 유효하지않다로 파싱한다.', () => {
        const xml = '<?xml version="1.0" encoding="utf-8"?>\n' +
            '<tistory><status>400</status><error_message>access_token 이 유효하지 않습니다.</error_message></tistory>\n';

        it('accessToken이 유효하지않다로 파싱한다', (done) => {
            parseString(xml, function (err, result) {
                assert.equal(result.tistory['error_message'], 'access_token 이 유효하지 않습니다.');
                done();
            });
        });
    });

});