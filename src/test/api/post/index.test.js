import {getAll} from 'src/main/api/post';
import {PostListRequestDto} from 'src/main/api/post/list/PostListRequestDto';

test("accessToken이 없을 경우 400에러발생한다", async () => {
    const accessToken = "token";
    const blogName = "jojoldu";
    const page = 0;
    const options = new PostListRequestDto(accessToken, blogName, page);

    try {
        await getAll(options);
    } catch (e) {
        expect(e.status).toBe(400);
    }

})