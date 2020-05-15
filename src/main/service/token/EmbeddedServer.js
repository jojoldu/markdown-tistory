
import {logger} from '../../utils/logger';
const express = require('express');

class EmbeddedServer {

    constructor() {
        this.app = null;
    }

    run(callback, blogJson) {
        this.app = express();
        app.listen(5000);
        app.get('/callback', this.publishAccessToken(callback, blogJson));
    }

    publishAccessToken(callback, blogJson) {
        return async (req) => {
            const code = req.query.code;
            if (code) {
                const accessToken = await getAccessTokenByCode(code, blogJson);
                callback(accessToken);
            } else {
                logger.error('Failed get Authorization Code');
                process.exit();
            }
        };
    }

    async getAccessTokenByCode(code, blogJson){
        const clientId = blogJson.clientId;
        const clientSecret = blogJson.secretKey;
        const parameter = 'client_id=' + clientId + '&client_secret=' + clientSecret + '&redirect_uri=' + REDIRECT_URI + '&code=' + code + '&grant_type=authorization_code';

        const options = {
            url: 'https://www.tistory.com/oauth/access_token?' + parameter,
            method: 'get'
        };

        try {
            const response = await requestPromise(options);
            const responseBody = response.split('=');
            if (responseBody[0] === 'error') {
                print.red('There was a problem in requesting access token from the Tistory API.\n' + responseBody[1]);
                process.exit();
            }

            return responseBody[1];
        } catch (err) {
            print.red('There was a problem in requesting access token from the Tistory API');
            throw err;
        }
    }

    getAuthorizationCode (blogJson) {
        const parameter = 'response_type=code&client_id=' + blogJson.clientId + '&redirect_uri=' + REDIRECT_URI;
        const authorizeUrl = 'https://www.tistory.com/oauth/authorize?' + parameter;
        browserOpen(authorizeUrl);
    };
}


export {EmbeddedServer}