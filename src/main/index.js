import {logger} from "./utils/logger.js";
import {tokenService} from "./service/token/tokenService.js";

async function cli() {
    const command = process.argv[2];
    logger.debug('>>>>>>>>> cli start');

    if(command === 'token') {
        await tokenService.saveAccessToken();
    } else {
        logger.info("markdown-tistory command are init, write, token, show \n" +
            "example) \n " +
            "markdown-tistory init \n " +
            "markdown-tistory write");
    }
}

export {cli}