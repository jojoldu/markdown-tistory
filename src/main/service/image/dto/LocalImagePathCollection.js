const localImageRegex = new RegExp("^(http|https)://", "i")

class LocalImagePathCollection {

    /**
     * @param {string} markdownContent
     */
    constructor(markdownContent) {
        this.localImages = this._extractByMarkdown(markdownContent)
            .map(image => this._extractPath(image))
            .filter(v => this._isLocalImage(v));
    }

    /**
     *
     * @param markdownContent
     * @returns {*|*[]}
     * @private
     */
    _extractByMarkdown(markdownContent) {
        const markdownImageRegex = /(?:!\[(.*?)\]\((.*?)\))/g;
        return markdownContent.match(markdownImageRegex) || [];
    }

    /**
     *
     * @param {string} imagePath
     * @returns {string}
     * @private
     */
    _extractPath(imagePath) {
        return imagePath.split('(')[1].replace(')', '');
    }

    /**
     *
     * @param {string} imagePath
     * @returns {boolean}
     * @private
     */
    _isLocalImage(imagePath) {
        return !localImageRegex.test(imagePath);

    }
}

export {LocalImagePathCollection};