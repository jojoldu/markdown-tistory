
import {logger} from '../../utils/logger';
const express = require('express');

class EmbeddedServer {

    constructor() {
        this.app = null;
    }

    run() {
        this.app = express();
        app.listen(5000);
        app.get('/callback', async (req) => {
            const code = req.query.code;
            if (code) {
                const accessToken = await getAccessTokenByCode(code, blogJson);
                callback(accessToken);
            } else {
                logger.error('Failed get Authorization Code');
                process.exit();
            }
        });
    }
}


export {EmbeddedServer}