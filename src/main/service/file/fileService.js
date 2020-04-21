import {logger} from '../../utils/logger';
import {LocalFileDto} from './LocalFileDto';

const fs = require('fs-extra')
const path = require('path')

class FileService {

    /**
     *
     * @param {string} filePath
     * @returns {LocalFileDto}
     */
    async getMarkdownFile(filePath) {
        const markdownPath = this.getMarkdownFilePath(filePath);
        const markdownName = this.getMarkdownFileName(markdownPath);
        const content = await fs.readFile(markdownPath, 'utf8');
        return new LocalFileDto(markdownPath, markdownName, content);
    }

    /**
     *
     * @param {string} filePath
     * @returns {string}
     */
    getMarkdownFilePath(filePath) {
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
    getMarkdownFileName (filePath) {
        const removedExt = filePath.slice(0, filePath.length-3); // .md 제거
        return path.parse(removedExt).name;
    }
}

const fileService = new FileService();


export {fileService};