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
 * @param {PostListRequestDto} requestDto
 * @returns {PostListResponseDto}
 */
async function getAll(requestDto) {
    const queryString = querystring.stringify(requestDto);
    const response = await instance.get(`/post/list?${queryString}`);
    return new PostListResponseDto(response.tistory);
}

/**
 *
 * @param {PostItemRequestDto} requestDto
 * @returns {PostItemResponseDto}
 */
async function get(requestDto) {
    const queryString = querystring.stringify(requestDto);
    const response = await instance.get(`/post/read?${queryString}`);
    return new PostItemResponseDto(response.data.tistory);
}

/**
 *
 * @param {PostSaveRequestDto} body
 * @returns {PostSaveResponseDto}
 */
async function save(body) {
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