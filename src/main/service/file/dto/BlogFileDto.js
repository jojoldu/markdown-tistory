class BlogFileDto {

    /**
     * @param {string} blogName
     * @param {string} clientId
     * @param {string} secretKey
     */
    constructor(blogName, clientId, secretKey) {
        this.blogName = blogName;
        this.clientId = clientId;
        this.secretKey = secretKey;
    }
}

export {BlogFileDto};