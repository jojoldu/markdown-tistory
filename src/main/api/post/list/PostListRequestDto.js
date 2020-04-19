const RequestDto = require('../../RequestDto');

/**
 *
 * @type {PostListRequestDto}
 */
module.exports = class PostListRequestDto extends RequestDto {
    constructor(accessToken, blogName, page) {
        super(accessToken, blogName);
        this.page = page;
    }
}
