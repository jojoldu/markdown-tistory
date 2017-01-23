/**
 * Created by jojoldu@gmail.com on 2017-01-16
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

const chalk = require('chalk');

const print = {
    red: function (content) {
        console.log(chalk.red(content));
    },
    yellow: function (content) {
        console.log(chalk.yellow(content));
    }
};

module.exports = print;

