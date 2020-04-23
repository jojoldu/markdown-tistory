import {logger} from '../../utils/logger';
import {MarkdownFileDto} from './dto/MarkdownFileDto';
import FilePath from 'src/main/utils/FilePath';
import {BlogFileDto} from "./dto/BlogFileDto";
import {AccessTokenFileDto} from "./dto/AccessTokenFileDto";

const fs = require('fs-extra')
const path = require('path')

class FileService {

    /**
     *
     * @param {string} filePath
     * @returns {Promise<MarkdownFileDto>}
     */
    async getMarkdown(filePath) {
        const markdownPath = this._getMarkdownFilePath(filePath);
        const markdownName = this._getMarkdownFileName(markdownPath);
        const content = await fs.readFile(markdownPath, 'utf8');
        return new MarkdownFileDto(markdownPath, markdownName, content);
    }

    /**
     *
     * @returns {Promise<BlogFileDto>}
     */
    async getBlog() {
        const jsonPath = `${FilePath.json}blog.json`;
        const blog = await this._getJson(jsonPath);
        return new BlogFileDto(blog.blogName, blog.clientId, blog.secretKey);
    }

    /**
     *
     * @returns {Promise<AccessTokenFileDto>}
     */
    async getAccessToken() {
        const jsonPath = `${FilePath.json}token.json`;
        const accessToken = await this._getJson(jsonPath);
        return new AccessTokenFileDto(accessToken);
    }

    /**
     *
     * @param {string} filePath
     * @returns {string}
     */
    _getMarkdownFilePath(filePath) {
        if(filePath) {
            return filePath;
        }

        const filesInCurrentDirectory = fs.readdirSync(dir);
        const mdName = filesInCurrentDirectory.filter((file) => path.extname(file) === '.md');

        if(!mdName) {
            const message = "There are no Markdown files in the current directory.";
            logger.error(message);
            throw new Error(message);
        }

        return process.cwd()+'/'+mdName;
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
            const jsonData = await fs.readFile(jsonPath, 'utf8');
            return JSON.parse(jsonData);
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