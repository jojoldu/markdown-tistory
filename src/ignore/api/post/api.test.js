import {fileService} from "src/main/service/file/fileService";
import {getAll, get, save, update} from 'src/main/api/post/index';
import {PostListRequestDto} from "src/main/api/post/list/PostListRequestDto";
import {PostItemRequestDto} from "src/main/api/post/item/PostItemRequestDto";
import {PostSaveRequestDto} from "src/main/api/post/save/PostSaveRequestDto";

let tokenJson;
let blogJson;

beforeEach(async () => {
    tokenJson = await fileService.getAccessToken();
    blogJson = await fileService.getBlog();
});

test("글 목록을 가져온다", async () => {
    const response = await getAll(new PostListRequestDto(tokenJson.accessToken, blogJson.blogName, 0));
    expect(response.isOk()).toBe(true);
    expect(response.item.page).toBe("1")
})

test("1개 글의 정보를 가져온다", async () => {
    const postId = "494";
    const response = await get(new PostItemRequestDto(tokenJson.accessToken, blogJson.blogName, postId));
    expect(response.status).toBe("200");
    expect(response.item.id).toBe(postId)
})

test("마크다운 내용을 포스팅 한다", async () => {
    const path = '/Users/idong-uk/Documents/git/markdown-tistory/src/test/resources/NO_IMAGE.md';
    const markdownFileDto = await fileService.getMarkdown(path);
    const response = await save(new PostSaveRequestDto(tokenJson.accessToken, blogJson.blogName, markdownFileDto.title, markdownFileDto.content));

    expect(response.isOk()).toBe(true);
})