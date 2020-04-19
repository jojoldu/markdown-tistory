const RequestDto = require('../../RequestDto');

/**
 *
 * @type {PostListRequestDto}
 */
class PostListRequestDto extends RequestDto {
    constructor(accessToken, blogName, page) {
        super(accessToken, blogName);
        this.page = page;
    }
}

export {PostListRequestDto}
