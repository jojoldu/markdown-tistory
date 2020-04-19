import axios from 'axios';
import {logger} from 'src/main/utils/logger';

function init() {
    return axios.create({
        headers: {
            'Content-Type': 'application/json',
        },
        baseURL: 'https://www.tistory.com/apis',
        timeout: 60000,
    });
}

function errorResponseHandler(error) {
    logger.error(error.response.data.tistory['error_message']);
    return Promise.reject(error.response);
}

function withInterceptors(axiosInit) {

    axiosInit.interceptors.response.use(
        response => response,
        errorResponseHandler);

    return axiosInit;
}

const instance = withInterceptors(init());

export {instance}