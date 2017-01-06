/**
 * Created by jojoldu@gmail.com on 2017-01-05
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

var sayHello = function (name) {
    var dir = __dirname;
    return "Hello, " + dir +", "+ name;
};

exports.sayHello = sayHello;
