import {RequestDto} from '../../RequestDto.js';

/**
 *
 * @type {PostSaveRequestDto}
 */
class PostSaveRequestDto extends RequestDto {

    /**
     *
     * @param {string} accessToken
     * @param {string} blogName jojoldu.tistory => jojoldu
     * @param {string} title
     * @param {string} content
     */
    constructor(accessToken, blogName, title, content) {
        super(accessToken, blogName);
        this.title = title;
        this.content = content;
        this.visibility = 0;
    }
}

export {PostSaveRequestDto}
