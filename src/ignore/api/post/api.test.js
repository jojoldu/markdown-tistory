import {fileService} from "src/main/service/file/fileService";
import {getAll, get, save, update} from 'src/main/api/post/index';
import {PostListRequestDto} from "src/main/api/post/list/PostListRequestDto";

test("글 목록을 가져온다", async () => {
    const tokenJson = await fileService.getAccessToken();
    const blogJson = await fileService.getBlog();

    const response = await getAll(new PostListRequestDto(tokenJson.accessToken, blogJson.blogName, 0));
    expect(response.status).toBe("200");
    expect(response.item.page).toBe("1")
})