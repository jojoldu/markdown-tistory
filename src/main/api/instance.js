import axios from 'axios';
import {logger} from 'src/main/utils/logger';

const BASE_URL = 'https://www.tistory.com/apis';
const TIME_OUT = 60000;

function init(contentType) {
    return axios.create({
        headers: {
            'Content-Type': contentType,
        },
        baseURL: BASE_URL,
        timeout: TIME_OUT,
    });
}

function errorResponseHandler(error) {
    const response = error.response;
    logger.error(`API 요청이 실패했습니다. url=${response.config.url} message=${response.data.tistory.error_message}`);
    return Promise.reject(response);
}

function withInterceptors(axiosInit) {
    axiosInit.interceptors.response.use(
        response => response,
        errorResponseHandler);

    return axiosInit;
}

const instance = withInterceptors(init('application/json'));

export {instance}