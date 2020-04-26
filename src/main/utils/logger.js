/**
 * Created by jojoldu@gmail.com on 2020-04-18
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

import chalk from 'chalk';

class Logger {

    /**
     *
     * @param {string} content
     */
    error(content) {
        console.log(chalk.red(content));
    }

    /**
     *
     * @param {string} content
     */
    info(content) {
        console.log(chalk.yellow(content));
    }

    /**
     *
     * @param {string} content
     */
    debug(content) {
        console.log(chalk.gray(content));
    }
}

const logger = new Logger();

export {logger}

