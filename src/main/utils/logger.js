/**
 * Created by jojoldu@gmail.com on 2020-04-18
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

import chalk from 'chalk';

const logger = {
    error: (content) => {
        console.log(chalk.red(content));
    },
    info: (content) => {
        console.log(chalk.yellow(content));
    },
    debug: (content) => {
        console.log(chalk.gray(content));
    }
};

export {logger}

