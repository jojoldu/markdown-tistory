import {logger} from "./utils/logger";
import {tokenService} from "./service/token/tokenService";

async function cli() {
    const command = process.argv[2];

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