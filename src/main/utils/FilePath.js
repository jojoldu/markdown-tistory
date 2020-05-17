import * as path from 'path';

class FilePath {
    constructor() {
        const _userHome = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
        this.json = path.join(_userHome, "/");
        this.blogPath = `${this.json}blog.json`
        this.tokenPath = `${this.json}token.json`
    }
}

export default (new FilePath);