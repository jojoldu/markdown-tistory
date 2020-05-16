import {EmbeddedServer} from "./EmbeddedServer";

class TokenService {

    async saveAccessToken() {
        const embeddedServer = new EmbeddedServer();
        embeddedServer.runRedirectServer();
        await embeddedServer.getAuthorizationCode();
    }

}

const tokenService = new TokenService();

export {tokenService}