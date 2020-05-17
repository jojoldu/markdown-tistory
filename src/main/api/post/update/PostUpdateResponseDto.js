import {ResponseDto} from "../../ResponseDto.js";

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
class PostUpdateResponseDto extends ResponseDto{
    constructor(tistory) {
        super(tistory.status);
        this.postId = tistory.postId;
        this.url = tistory.url;
    }
}

export {PostUpdateResponseDto};