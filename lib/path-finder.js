/**
 * Created by jojoldu@gmail.com on 2017-01-25
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

exports.getRoot = function () {
    return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
};

