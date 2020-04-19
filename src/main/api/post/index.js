import {instance} from 'src/main/api/instance';
// import {querystring} from 'querystring';
const querystring = require('querystring');

/**
 *
 * @param PostListRequestDto options
 * @returns {*}
 */
function getAll(options) {
    const queryString = querystring.stringify(options);
    return instance.get(`/post/list?${queryString}`);
}

export {getAll}