import {RequestDto} from 'src/main/api/RequestDto';

/**
 *
 * @type {PostListRequestDto}
 */
class PostListRequestDto extends RequestDto {

    /**
     *
     * @param {string} accessToken
     * @param {string} blogName
     * @param {number} page
     */
    constructor(accessToken, blogName, page) {
        super(accessToken, blogName);
        this.page = page;
    }
}

export {PostListRequestDto}
