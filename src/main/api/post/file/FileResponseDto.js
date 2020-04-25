/**
 *
 {
  "tistory":{
    "status":"200",
    "url":"http://cfile6.uf.tistory.com/image/1328CE504DB79F5932B13F",
    "replacer":"%5b%23%23_1N%7ccfile6.uf%401328CE504DB79F5932B13F%7cwidth%3d\"500\"+height%3d\"300\"%7c_%23%23%5d"
  }
}
 * @type {FileResponseDto}
 */
class FileResponseDto {
    constructor(tistory) {
        this.status = tistory.status;
        this.url = tistory.url;
        this.replacer = tistory.replacer;
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

export {FileResponseDto};