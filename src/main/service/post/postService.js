import {fileService} from "../file/fileService";
import {get, save, update} from 'src/main/api/post';
import {PostItemRequestDto} from "../../api/post/item/PostItemRequestDto";
import {imageService} from "../image/imageService";
import {PostSaveRequestDto} from "../../api/post/save/PostSaveRequestDto";

const {isBlank} = require('npm-stringutils');

class PostService {

    /**
     *
     * @param {string} postId
     * @returns {PostItemResponseDto}
     */
    async get(postId) {
        const blogJson = await fileService.getBlog();
        const tokenJson = await fileService.getAccessToken();

        const blogName = blogJson.blogName;
        const accessToken = tokenJson.accessToken;

        return get(new PostItemRequestDto(accessToken, blogName, postId));
    }

    /**
     *
     * @param {string} path
     * @returns {void}
     */
    async write(path) {
        const markdownPath = this._getOrDefaultMarkdownPath(path);
        const markdownDto = imageService.exchangeImagePath(fileService.getMarkdown(markdownPath));
        const tokenJson = await fileService.getAccessToken();
        const blogJson = await fileService.getBlog();

        save(new PostSaveRequestDto(
            tokenJson.accessToken,
            blogJson.blogName,
            markdownDto.title,
            markdownDto.content));
    }

    async update(path, postId) {
        const markdownPath = this._getOrDefaultMarkdownPath(path);
        const markdownDto = imageService.exchangeImagePath(fileService.getMarkdown(markdownPath));
    }

    _getOrDefaultMarkdownPath(markdownPath) {
        if (!isBlank(markdownPath)) {
            return markdownPath;
        }

        markdownPath = fileService._getDefaultMarkdownPath();
        if (isBlank(markdownPath)) {
            throw new Error('There are no Markdown file in the current directory');
        }

        return markdownPath;
    }


}

const postService = new PostService();

export {postService};