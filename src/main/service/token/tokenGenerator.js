import {logger} from '../../utils/logger';

const {isBlank} = require('npm-stringutils');
const fs = require('fs-extra');
import FilePath from 'src/main/utils/FilePath';

class TokenGenerator {

    async saveBlogJson() {
        const content =
            '{\n' +
            '   "blogName":"",\n' +
            '   "clientId":"",\n' +
            '   "secretKey":"",\n' +
            '   "adsenseCode":"광고스크립트 코드에서 쌍따옴표는 모두 홀따옴표로 변경해서 등록하셔야 문자열 파싱 에러가 발생하지 않습니다." \n' +
            '}';

        try {
            return await fs.writeFile(FilePath.blogPath, content, 'utf8');
        } catch (e) {
            logger.error('An error occurred while publishing blog.json ');
            throw e;
        }
    }

    /**
     *
     * @param {string} accessToken
     * @returns {Promise<void>}
     */
    async saveAccessToken(accessToken) {
        if(isBlank(accessToken)) {
            logger.error('Access token Empty');
            throw new Error();
        }

        try {
            const content = JSON.stringify({"accessToken": accessToken});
            await fs.writeFile(FilePath.tokenPath, content, 'utf8');
            logger.info('Access token published.');
        } catch (e) {
            logger.error('There was a problem creating the access token file.\n');
            throw e;
        }
    }
}

const tokenGenerator = new TokenGenerator();
export {tokenGenerator}