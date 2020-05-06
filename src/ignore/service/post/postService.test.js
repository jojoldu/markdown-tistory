import {postService} from 'src/main/service/post/postService';

test("1개 글의 정보를 가져온다", async () => {
    const postId = "494";
    const response = await postService.get(postId);
    expect(response.status).toBe("200");
    expect(response.item.id).toBe(postId)
})

test("1개의 글을 등록한다", async () => {
    const path = '/Users/idong-uk/Documents/git/markdown-tistory/src/test/resources/NO_IMAGE.md';
    const response = await postService.write(path);
    expect(response.isOk()).toBe(true);
})

test("1개의 글을 수정한다", async () => {
    const path = '/Users/idong-uk/Documents/git/markdown-tistory/src/test/resources/NO_IMAGE.md';
    const response = await postService.update(path, '499');
    expect(response.isOk()).toBe(true);
})