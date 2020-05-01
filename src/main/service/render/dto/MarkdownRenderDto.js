import {logger} from "../../../utils/logger";
const { isBlank } = require('npm-stringutils');

class MarkdownRenderDto {

    /**
     * @param {string} markdownContent
     * @param {string} adCode
     */
    constructor(markdownContent, adCode) {
        this.content = this._replaceAdCode(markdownContent, adCode);
    }

    _replaceAdCode (markdownContent, adCode) {
        if(isBlank(adCode)) {
            logger.info('AdSenseCode is Empty.');
            return markdownContent;
        }

        return markdownContent.replace(/\[\[ad\]\]/g, adCode);
    }
}

export {MarkdownRenderDto}