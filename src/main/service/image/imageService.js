import {logger} from 'src/main/utils/logger';
import {LocalImagePathCollection} from './dto/LocalImagePathCollection';
import {fileService} from 'src/main/service/file/fileService';
import {uploadFile} from 'src/main/api/post';
import {FileRequestDto} from "../../api/post/file/FileRequestDto";
import {ImagePathUrlDto} from "./dto/ImagePathUrlDto";

const fs = require('fs-extra')
const path = require('path')

class ImageService {

    /**
     *
     * @param {MarkdownFileDto} markdownFileDto
     * @returns {Promise<MarkdownFileDto>}
     */
    async exchangeImagePath(markdownFileDto) {
        const localImages = new LocalImagePathCollection(markdownFileDto.content).localImages;
        const imageUrls = await this._toTistoryUrl(markdownFileDto.fullPath, localImages);
        markdownFileDto.replaceAllImagePath(imageUrls);

        return markdownFileDto;
    }

    async _toTistoryUrl(markdownPath, localImages) {
        const blogJson = await fileService.getBlog();
        const tokenJson = await fileService.getAccessToken();

        const blogName = blogJson.blogName;
        const accessToken = tokenJson.accessToken;

        return Promise.all(localImages.map(async (localImage) => {
            const imageFullPath = this._getImageFullPath(markdownPath, localImage);
            const isExist = await fs.exists(imageFullPath);
            if (!isExist) {
                logger.info('Not Found File: ' + imageFullPath);
                return false;
            }

            const file = await fs.createReadStream(imageFullPath);
            const body = new FileRequestDto(accessToken, blogName, file);

            const response = await uploadFile(body);

            if (response.isNotOk()) {
                return false;
            }

            return new ImagePathUrlDto(localImage, response.url);
        }));
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