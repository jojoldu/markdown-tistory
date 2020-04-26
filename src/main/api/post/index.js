import {instance} from 'src/main/api/instance';
import {PostListResponseDto} from './list/PostListResponseDto';
import {PostItemResponseDto} from './item/PostItemResponseDto';
import {PostSaveResponseDto} from "./save/PostSaveResponseDto";
import {PostUpdateResponseDto} from "./update/PostUpdateResponseDto";
import {FileResponseDto} from "./file/FileResponseDto";
import {post} from 'request-promise';
import {logger} from "../../utils/logger";

const querystring = require('querystring');

/**
 *
 * @param {PostListRequestDto} options
 * @returns {PostListResponseDto}
 */
function getAll(options) {
    const queryString = querystring.stringify(options);
    return new PostListResponseDto(instance.get(`/post/list?${queryString}`));
}

/**
 *
 * @param {PostUpdateRequestDto} options
 * @returns {PostItemResponseDto}
 */
function get(options) {
    const queryString = querystring.stringify(options);
    return new PostItemResponseDto(instance.get(`/post/read?${queryString}`));
}

/**
 *
 * @param {PostSaveRequestDto} body
 * @returns {PostSaveResponseDto}
 */
function save(body) {
    return new PostSaveResponseDto(instance.post('/post/write', body));
}

/**
 *
 * @param {PostUpdateRequestDto} body
 * @returns {PostUpdateResponseDto}
 */
async function update(body) {
    const response = await instance.post('/post/modify', body);
    return new PostUpdateResponseDto(response.tistory);
}

/**
 *
 * @param {FileRequestDto} body
 * @returns {FileResponseDto}
 */
async function uploadFile(body) {
    const url = `https://www.tistory.com/apis/post/attach`;
    try{
        const response = await post({url: url, formData: body,  json: true});
        return new FileResponseDto(response.tistory);
    } catch (err) {
        const response = err.error.tistory;
        logger.error(`API 호출에 실패하였습니다. url=${url} status=${response.status} message=${response.error_message}`);
        throw err;
    }

}

export {getAll, get, save, update, uploadFile}