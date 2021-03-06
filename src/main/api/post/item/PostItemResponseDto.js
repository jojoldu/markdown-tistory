import {ResponseDto} from "../../ResponseDto.js";

/**
 {
  "tistory":{
    "status":"200",
    "item":{
      "url":"http://oauth.tistory.com",
      "secondaryUrl":"",
      "id":"1",
      "title":"티스토리 OAuth2.0 API 오픈!",
      "content":"안녕하세요 Tistory API 입니다.",
      "categoryId":"0",
      "postUrl":"http://oauth.tistory.com/1",
      "visibility":"0",
      "acceptComment":"1",
      "acceptTrackback":"1",
      "tags":{
        "tag":["open", "api"]
      },
      "comments":"0",
      "trackbacks":"0",
      "date":"1303352668"
    }
  }
}
 * @type {PostItemResponseDto}
 */
class PostItemResponseDto extends ResponseDto {
    constructor(tistory) {
        super(tistory.status);
        this.item = tistory.item;
    }

    /**
     *
     * @returns {string}
     */
    getTitle() {
        return this.item.titie;
    }

    /**
     *
     * @returns {string}
     */
    getCategoryId() {
        return this.item.categoryId;
    }

    /**
     *
     * @returns {string[]}
     */
    getTags() {
        if(this.item.tags) {
            return this.item.tags.tag;
        }
        
        return [];
    }

    /**
     *
     * @returns {string}
     */
    getId() {
        return this.item.id;
    }

}

export {PostItemResponseDto};