import {RequestDto} from '../../RequestDto.js';

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
     * @param {string} postId
     */
    constructor(accessToken, blogName, title, content, categoryId, tags, postId) {
        super(accessToken, blogName);
        this.title = title;
        this.content = content;
        this.categoryId = categoryId;
        this.tag = tags ? tags.join(',') : ''
        this.postId = postId;
        this.visibility = 0;
    }

    /**
     *
     * @param {string} accessToken
     * @param {string} blogName
     * @param {Tistory} tistory
     * @param {string} content
     */
    static of(accessToken, blogName, tistory, content) {
        return new PostUpdateRequestDto(
            accessToken,
            blogName,
            tistory.titie,
            content,
            tistory.categoryId,
            tistory.tags,
            tistory.id
        );
    }
}

export {PostUpdateRequestDto}
