/**
 *
 {
  "tistory":{
    "status":"200",
    "postId":"74",
    "url":"http://sampleUrl.tistory.com/74"
  }
}
 * @type {PostUpdateResponseDto}
 */
class PostUpdateResponseDto {
    constructor(tistory) {
        this.status = tistory.status;
        this.postId = tistory.postId;
        this.url = tistory.url;
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

export {PostUpdateResponseDto};