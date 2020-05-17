import {instance} from '../instance.js';
import {logger} from "../../utils/logger.js";

import * as querystring from 'query-string';

/**
 *
 * @param {AccessTokenRequestDto} requestDto
 * @returns {string}
 */
async function getAccessToken(requestDto) {
    const queryString = querystring.stringify(requestDto);
    const response = await instance.get(`/oauth/access_token${queryString}`)
    const responseBody = response.split('=');
    if (responseBody[0] === 'error') {
        logger.error(`There was a problem in requesting access token from the Tistory API. ${responseBody[1]}`);
        return null;
    }

    return responseBody[1];
}

export {getAccessToken}