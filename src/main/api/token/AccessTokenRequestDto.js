
/**
 *
 * @type {AccessTokenRequestDto}
 */
class AccessTokenRequestDto {

    /**
     *
     * @param {string} clientId
     * @param {string} clientSecret
     * @param {string} redirectUri
     * @param {string} code
     */
    constructor(clientId, clientSecret, redirectUri, code) {
        this.client_id = clientId;
        this.client_secret = clientSecret;
        this.redirect_uri = redirectUri;
        this.code = code
        this.grant_type = 'authorization_code'
    }

}

export {AccessTokenRequestDto}