import {RequestDto} from 'src/main/api/RequestDto';

/**
 *
 * @type {PostUpdateRequestDto}
 */
class PostUpdateRequestDto extends RequestDto {

    /**
     *
     * @param {string} accessToken
     * @param {string} blogName jojoldu.tistory => jojoldu
     * @param {string} title
     * @param {string} content
     * @param {string} categoryId
     * @param {string[]} tags
     * @param {number} postId
     */
    constructor(accessToken, blogName, title, content, categoryId, tags, postId) {
        super(accessToken, blogName);
        this.title = title;
        this.content = content;
        this.categoryId = categoryId;
        this.tag = tags? tags.join(',') : ''
        this.postId = postId;
        this.visibility = 0;
    }
}

export {PostUpdateRequestDto}
