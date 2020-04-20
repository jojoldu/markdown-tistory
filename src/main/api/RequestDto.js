class RequestDto {

    /**
     *
     * @param {string} accessToken
     * @param {string} blogName
     */
    constructor(accessToken, blogName) {
        this.access_token = accessToken;
        this.output = 'json';
        this.blogName = blogName;
    }
}

export {RequestDto};