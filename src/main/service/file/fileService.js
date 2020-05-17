import {logger} from '../../utils/logger.js';
import {MarkdownFileDto} from './dto/MarkdownFileDto.js';
import FilePath from '../../utils/FilePath.js';
import {BlogFileDto} from "./dto/BlogFileDto.js";
import {AccessTokenFileDto} from "./dto/AccessTokenFileDto.js";

import {stringUtils} from '../../utils/stringUtils.js';
import fs from 'fs-extra';
import * as path from 'path';

class FileService {

    async saveBlogJson() {
        const content =
            '{\n' +
            '   "blogName":"",\n' +
            '   "clientId":"",\n' +
            '   "secretKey":"",\n' +
            '   "adsenseCode":"광고스크립트 코드에서 쌍따옴표는 모두 홀따옴표로 변경해서 등록하셔야 문자열 파싱 에러가 발생하지 않습니다." \n' +
            '}';

        try {
            return await fs.readJson(FilePath.blogPath, content);
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
        if(stringUtils.isBlank(accessToken)) {
            logger.error('Access token Empty');
            throw new Error();
        }

        try {
            const content = JSON.stringify({"accessToken": accessToken});
            await fs.writeJson(FilePath.tokenPath, content);
            logger.info('Access token published.');
        } catch (e) {
            logger.error('There was a problem creating the access token file.\n');
            throw e;
        }
    }

    /**
     *
     * @param {string} filePath
     * @returns {MarkdownFileDto}
     */
    async getMarkdown(filePath) {
        const markdownName = this._getMarkdownFileName(filePath);
        const content = await fs.readJson(filePath);
        return new MarkdownFileDto(filePath, markdownName, content);
    }

    /**
     *
     * @returns {Promise<BlogFileDto>}
     */
    async getBlog() {
        const jsonPath = `${FilePath.blogPath}`;
        const blog = await this._getJson(jsonPath);
        return new BlogFileDto(blog.blogName, blog.clientId, blog.secretKey);
    }

    /**
     *
     * @returns {Promise<AccessTokenFileDto>}
     */
    async getAccessToken() {
        const jsonPath = `${FilePath.tokenPath}`;
        const tokenJson = await this._getJson(jsonPath);
        return new AccessTokenFileDto(tokenJson.accessToken);
    }

    /**
     *
     * @returns {string}
     */
    _getDefaultMarkdownPath() {
        const dir = process.cwd();
        const filesInCurrentDirectory = fs.readdirSync(dir);
        const mdName = filesInCurrentDirectory.filter((file) => path.extname(file) === '.md');

        if(!mdName) {
            const message = "There are no Markdown files in the current directory.";
            logger.error(message);
            return '';
        }

        return dir+'/'+mdName;
    }

    /**
     *
     * @param {string} filePath
     * @returns {string}
     */
    _getMarkdownFileName (filePath) {
        const removedExt = filePath.slice(0, filePath.length-3); // .md 제거
        return path.parse(removedExt).name;
    }


    /**
     *
     * @param {string} jsonPath
     * @returns {Promise<any>}
     * @private
     */
    async _getJson(jsonPath) {
        try {
            const jsonData = await fs.readJson(jsonPath);
            return jsonData;
        } catch (err) {
            logger.error(`There is no ${jsonPath}\n`);
            logger.error(`Please run markdown-tistory init`);
            logger.error(err);
            process.exit();
        }
    }
}

const fileService = new FileService();

export {fileService};