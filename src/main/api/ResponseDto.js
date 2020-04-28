class ResponseDto {

    /**
     *
     * @param {string} status
     */
    constructor(status) {
        this.status = status;
    }

    /**
     *
     * @returns {boolean}
     */
    isNotOk () {
        return !this.isOk();
    }

    /**
     *
     * @returns {boolean}
     */
    isOk () {
        return this.status === "200";
    }
}

export {ResponseDto};