import {postService} from 'src/main/service/post/postService';

test("1개 글의 정보를 가져온다", async () => {
    const postId = "494";
    const response = await postService.get(postId);
    expect(response.status).toBe("200");
    expect(response.item.id).toBe(postId)
})
