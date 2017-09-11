/**
 * Created by jojoldu@gmail.com on 2017. 9. 10.
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

const tokenGenerator = require('../lib/token-manager');
const assert = require('assert');

describe('token-generator', ()=>{
    describe('Root Path에 있는 blog정보의 타이틀은 jojoldu이다.', ()=>{
        it('getBlogJson은 Promise 객체 리턴한다.', (done)=>{
            tokenGenerator.getBlogJson()
                .then((json)=>{
                    assert.equal(json.blogName, 'jojoldu');
                    done();
                });
        });
    });
});