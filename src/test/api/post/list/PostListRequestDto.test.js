import {PostListRequestDto} from 'src/main/api/post/list/PostListRequestDto';

test("JS Class로 인스턴스 생성시 JSON 객체가 변환된다", () => {
    const accessToken = "token";
    const blogName = "jojoldu";
    const page = 0;
    const obj = new PostListRequestDto(accessToken, blogName, page);

    expect(obj.access_token).toBe(accessToken);
    expect(obj.blogName).toBe(blogName);
    expect(obj.page).toBe(page);
})