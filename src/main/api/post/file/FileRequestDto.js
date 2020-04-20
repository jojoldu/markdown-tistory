import {RequestDto} from 'src/main/api/RequestDto';

/**
 *
 * @type {PostSaveRequestDto}
 */
class FileRequestDto extends RequestDto {

    /**
     *
     * @param {string} accessToken
     * @param {string} blogName jojoldu.tistory => jojoldu
     * @param {string} uploadedfile
     */
    constructor(accessToken, blogName, uploadedfile) {
        super(accessToken, blogName);
        this.uploadedfile = uploadedfile;
    }
}

export {FileRequestDto}
