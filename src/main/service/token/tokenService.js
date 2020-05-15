import {fileService} from "../file/fileService";
import {tokenGenerator} from "./tokenGenerator";
import {EmbeddedServer} from "./EmbeddedServer";

class TokenService {

    async publishAccessToken() {
        const blogJson = await fileService.getBlog();
        const embeddedServer = new EmbeddedServer();

    }

}

const tokenService = new TokenService();

export {tokenService}