/**
 * Created by jojoldu@gmail.com on 2017-01-25
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

const pathFinder = require('../lib/path-finder');

describe('path-finder 테스트', function() {
    describe('내 PC의 RootPath를 보여준다', function() {
        it('내 PC의 RootPath를 보여준다.', function() {
            console.log(pathFinder.getRoot());
        });
    });
});
