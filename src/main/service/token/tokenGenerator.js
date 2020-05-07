import {logger} from '../../utils/logger';
const { isBlank } = require('npm-stringutils');
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
        } catch (err) {
            logger.red('An error occurred while issuing blog.json ');
            throw err;
        }
    }

    saveAccessToken() {

    }
}

const tokenGenerator = new TokenGenerator();
export {tokenGenerator}