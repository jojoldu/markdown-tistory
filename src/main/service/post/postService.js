import {fileService} from "../file/fileService";
import {get, save, update} from 'src/main/api/post';
import {PostItemRequestDto} from "../../api/post/item/PostItemRequestDto";
import {imageService} from "../image/imageService";
import {PostSaveRequestDto} from "../../api/post/save/PostSaveRequestDto";
import {Tistory} from "../../entity/Tistory";
import {PostUpdateRequestDto} from "../../api/post/update/PostUpdateRequestDto";
import {renderService} from "../render/renderService";
import {MarkdownRenderDto} from "../render/dto/MarkdownRenderDto";

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
     * @returns {PostSaveResponseDto}
     */
    async write(path) {
        const markdown = await this._getMarkdown(path);
        const htmlContent = renderService.toHtml(new MarkdownRenderDto(markdown.content, ''));
        const tokenJson = await fileService.getAccessToken();
        const blogJson = await fileService.getBlog();

        return save(new PostSaveRequestDto(
            tokenJson.accessToken,
            blogJson.blogName,
            markdown.title,
            htmlContent));
    }

    /**
     *
     * @param {string} path
     * @param {string} postId
     * @returns {PostUpdateResponseDto}
     */
    async update(path, postId) {
        const markdown = await this._getMarkdown(path);
        const htmlContent = renderService.toHtml(new MarkdownRenderDto(markdown.content, ''));
        const blogInfo = await this.get(postId);
        const tistory = new Tistory(
            blogInfo.getId(),
            blogInfo.getTitle(),
            blogInfo.getCategoryId(),
            blogInfo.getTags());

        const tokenJson = await fileService.getAccessToken();
        const blogJson = await fileService.getBlog();

        return update(PostUpdateRequestDto.of(
            tokenJson.accessToken,
            blogJson.blogName,
            tistory,
            htmlContent
        ));
    }

    async _getMarkdown(path) {
        const markdownPath = this._getOrDefaultMarkdownPath(path);
        const markdown = await fileService.getMarkdown(markdownPath);
        if(markdown.isEmptyContent()) {
            throw new Error(`There are empty Markdown Content path=${markdown.fullPath}`);
        }

        return imageService.exchangeImagePath(markdown);
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