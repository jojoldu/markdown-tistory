import {logger} from '../../utils/logger.js';
import {LocalImagePathCollection} from './dto/LocalImagePathCollection.js';
import {fileService} from '../../service/file/fileService.js';
import {uploadFile} from '../../api/post/index.js';
import {FileRequestDto} from "../../api/post/file/FileRequestDto.js";
import {ImagePathUrlDto} from "./dto/ImagePathUrlDto.js";

import fs from 'fs-extra';
import * as path from 'path';

class ImageService {

    /**
     *
     * @param {MarkdownFileDto} markdownFileDto
     * @returns {MarkdownFileDto}
     */
    async exchangeImagePath(markdownFileDto) {
        const localImages = new LocalImagePathCollection(markdownFileDto.content).localImages;
        const imageUrls = await this._toTistoryUrl(markdownFileDto.fullPath, localImages);
        markdownFileDto.replaceAllImagePath(imageUrls);

        return markdownFileDto;
    }

    /**
     *
     * @param markdownPath
     * @param localImages
     * @returns {Promise<ImagePathUrlDto[]>}
     * @private
     */
    async _toTistoryUrl(markdownPath, localImages) {
        const blogJson = await fileService.getBlog();
        const tokenJson = await fileService.getAccessToken();

        const blogName = blogJson.blogName;
        const accessToken = tokenJson.accessToken;

        return Promise.all(localImages.map(async (localImage) => {
            const imageFullPath = this._getImageFullPath(markdownPath, localImage);
            const response = await this._uploadFile(imageFullPath, accessToken, blogName);

            if (response.isNotOk()) {
                return false;
            }

            return new ImagePathUrlDto(localImage, response.url);
        }));
    }

    async _uploadFile(imageFullPath, accessToken, blogName) {
        const isExist = await fs.exists(imageFullPath);
        if (!isExist) {
            logger.info('Not Found File: ' + imageFullPath);
            return false;
        }

        const file = await fs.createReadStream(imageFullPath);
        const body = new FileRequestDto(accessToken, blogName, file);

        return uploadFile(body);
    }

    _getImageFullPath(markdownPath, imagePath) {
        const isRelativePath = imagePath.startsWith('\.');

        if (isRelativePath) {
            const removedPath = this._removeFileName(markdownPath);
            return path.join(removedPath + imagePath)
        }

        return imagePath;
    }

    _removeFileName(markdownPath) {
        const parsed = markdownPath.split("\/");
        parsed.splice(parsed.length - 1, 1); // 마지막 위치의 파일명 삭제

        if (parsed.length === 0) {
            parsed.push('.');
        }

        return parsed.join('/') + '/';
    }

}

const imageService = new ImageService();

export {imageService};