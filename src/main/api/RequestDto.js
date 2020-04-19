module.exports = class RequestDto {

    constructor(accessToken, blogName) {
        this.access_token = accessToken;
        this.output = 'json';
        this.blogName = blogName;
    }
}
