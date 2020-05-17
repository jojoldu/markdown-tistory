import {stringUtils} from '../../../utils/stringUtils.js';


class MarkdownFileDto {

    /**
     * @param {string} fullPath
     * @param {string} title
     * @param {string} content
     */
    constructor(fullPath, title, content) {
        this.fullPath = fullPath;
        this.title = title;
        this.content = content;
    }

    /**
     *
     * @param {Array<ImagePathUrlDto>} imageUrls
     */
    replaceAllImagePath(imageUrls) {
        for (let i = 0, length = imageUrls.length; i < length; i++) {
            this.content = this.content.replace(imageUrls[i].localFilePath, imageUrls[i].tistoryFileUrl);
        }
    }

    isEmptyContent() {
        return stringUtils.isBlank(this.content);
    }
}

export {MarkdownFileDto};