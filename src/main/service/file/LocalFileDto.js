class LocalFileDto {

    /**
     * @param {string} path
     * @param {string} title
     * @param {string} content
     */
    constructor(path, title, content) {
        this.path = path;
        this.title = title;
        this.content = content;
    }
}

export {LocalFileDto};