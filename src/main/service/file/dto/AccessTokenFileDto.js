class AccessTokenFileDto {

    /**
     * @param {string} accessToken
     */
    constructor(accessToken) {
        this._accessToken = accessToken;
    }


    get accessToken() {
        return this._accessToken;
    }
}

export {AccessTokenFileDto};