import {instance} from 'src/main/api/instance';
import {PostListResponseDto} from './list/PostListResponseDto';
import {PostItemResponseDto} from './item/PostItemResponseDto';
import {PostSaveResponseDto} from "./save/PostSaveResponseDto";
import {PostUpdateResponseDto} from "./update/PostUpdateResponseDto";
import {FileResponseDto} from "./file/FileResponseDto";

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
function update(body) {
    return new PostUpdateResponseDto(instance.post('/post/modify', body));
}

/**
 *
 * @param {FileRequestDto} body
 * @returns {FileResponseDto}
 */
function uploadFile(body) {
    return new FileResponseDto(instance.post('/post/attach', body));
}

export {getAll, get, save, update, uploadFile}