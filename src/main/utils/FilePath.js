const path = require('path');
class FilePath {
    constructor() {
        const _userHome = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
        this.json = path.join(_userHome, "/");
    }
}

export default (new FilePath);