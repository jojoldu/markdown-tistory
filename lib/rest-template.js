/**
 * Created by jojoldu@gmail.com on 2017. 9. 9.
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

const imageConverter = require('./image-manager');
const markdownTemplate = require('./markdown-template');
const print = require('./print');

const xml2js = require('xml2js-es6-promise');
const rp = require('request-promise');

const GET_URL = 'https://www.tistory.com/apis/post/read';
const WRITE_URL = 'https://www.tistory.com/apis/post/write';
const UPDATE_URL = 'https://www.tistory.com/apis/post/modify';

const get = async (blogName, postId, accessToken) => {
    const options = {
        url: GET_URL,
        method: 'get',
        qs: {
            blogName: blogName,
            postId: postId,
            access_token: accessToken,
            output: 'json'
        }
    };
    const response = JSON.parse(await rp(options));
    const status = response.tistory.status;
    if (status === "200") {
        print.yellow('Congratulations!! Get Blog Information.');
    } else {
        print.red("code : " + statusCode + "\nmessage : " + json.tistory['error_message'][0]);
    }
    const item = response.tistory.item;

    return {
        title: item.title,
        tags: item.tags.tag,
        categoryId: item.categoryId
    };
};

const write = async (markdownFile, blogJson, accessToken) => {
    const parameters = {
        visibility: blogJson.visibility,
        category: markdownFile.info.categoryId,
        tag: markdownFile.info.tags,
        accessToken: accessToken,
        blogName: blogJson.blogName,
        targetUrl: blogJson.targetUrl ? blogJson.targetUrl : blogJson.blogName
    };
    const exchangedImage = await imageConverter.exchange(markdownFile.location, markdownFile.data, parameters);

    const form = {
        access_token: parameters.accessToken,
        visibility: parameters.visibility,
        category: parameters.category,
        tag: parameters.tag,
        blogName: parameters.blogName,
        targetUrl: parameters.targetUrl,
        title: markdownFile.title
    };

    return await uploadContent(exchangedImage, parameters, form, WRITE_URL);
};

const update = async (markdownFile, blogJson, accessToken, postId) => {
    const parameters = {
        visibility: blogJson.visibility,
        category: markdownFile.info.categoryId,
        tag: markdownFile.info.tags,
        accessToken: accessToken,
        blogName: blogJson.blogName,
        targetUrl: blogJson.targetUrl ? blogJson.targetUrl : blogJson.blogName
    };

    const blogInfo = await get(blogJson.blogName, postId, accessToken);
    const exchangedImage = await imageConverter.exchange(markdownFile.location, markdownFile.data, parameters);

    const form = {
        access_token: parameters.accessToken,
        visibility: blogJson.visibility,
        blogName: parameters.blogName,
        targetUrl: parameters.targetUrl,
        title: blogInfo.title,
        category: blogInfo.categoryId? blogInfo.categoryId : parameters.category,
        tag: blogInfo.tags? blogInfo.tags.join(',') : parameters.tag,
        postId: postId
    };

    return await uploadContent(exchangedImage, parameters, form, UPDATE_URL);
};

const uploadContent = async (markdownText, parameters, form, url) => {
    form['content'] = await markdownTemplate.template(markdownText);

    const options = {
        url: url,
        method: 'post',
        form: form
    };

    try {
        const response = await rp(options);
        const json = await xml2js(response);

        const statusCode = json.tistory.status[0];
        if (statusCode === "200") {
            print.yellow('Congratulations!! Posted.');
        } else {
            print.red("code : " + statusCode + "\nmessage : " + json.tistory['error_message'][0]);
        }

        return json.tistory;
    } catch (err) {
        throw err;
    }
};

exports.get = get;
exports.write = write;
exports.update = update;
exports.uploadContent = uploadContent;
