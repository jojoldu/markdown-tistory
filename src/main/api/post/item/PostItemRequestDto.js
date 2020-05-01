import {RequestDto} from 'src/main/api/RequestDto';

/**
 *
 * @type {PostItemRequestDto}
 */
class PostItemRequestDto extends RequestDto {

    /**
     *
     * @param {string} accessToken
     * @param {string} blogName jojoldu.tistory => jojoldu
     * @param {string} postId
     */
    constructor(accessToken, blogName, postId) {
        super(accessToken, blogName);
        this.postId = postId;
    }
}

export {PostItemRequestDto}
