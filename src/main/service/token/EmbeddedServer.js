
import {logger} from '../../utils/logger';
import {getAccessToken} from 'src/main/api/token';
import {fileService} from "../file/fileService";
import {AccessTokenRequestDto} from "../../api/token/AccessTokenRequestDto";

const express = require('express');
const browserOpen = require('open');

class EmbeddedServer {

    constructor() {
        this.reqirectUrl = 'http://localhost:5000/callback';
        this.app = null;
    }

    runRedirectServer() {
        this.app = express();
        app.listen(5000);
        app.get('/callback', async (req) => {
            const code = req.query.code;
            if (code) {
                const blogJson = await fileService.getBlog();
                const accessToken = await getAccessToken(new AccessTokenRequestDto(
                    blogJson.clientId,
                    blogJson.secretKey,
                    this.reqirectUrl,
                    code));
                await fileService.saveAccessToken(accessToken);
            } else {
                logger.error('Failed get Authorization Code');
                process.exit();
            }
        });
    }

    async getAuthorizationCode () {
        const blogJson = await fileService.getBlog();
        const parameter = `response_type=code&client_id=${blogJson.clientId}&redirect_uri=${this.reqirectUrl}`;
        const authorizeUrl = `https://www.tistory.com/oauth/authorize?${parameter}`;
        browserOpen(authorizeUrl);
    }
}


export {EmbeddedServer}