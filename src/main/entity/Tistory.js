
class Tistory {

    /**
     *
     * @param {string} id
     * @param {string} title
     * @param {string} categoryId
     * @param {string[]} tags
     */
    constructor(id, title, categoryId, tags) {
        this.id = id;
        this.titie = title;
        this.categoryId = categoryId;
        this.tags = tags;
    }
}

export {Tistory}