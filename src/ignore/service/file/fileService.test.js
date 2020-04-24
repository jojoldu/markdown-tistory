import {fileService} from 'src/main/service/file/fileService';
import JasmineExpect from "jasmine-expect";

test("PC의 blog.json정보를 가져온다", async () => {
    const blogFileDto = await fileService.getBlog();

    expect(blogFileDto.blogName).toBe('jojoldu');
    expect(blogFileDto.secretKey).toBeNonEmptyString();
    expect(blogFileDto.clientId).toBeNonEmptyString();
})

test("PC의 token.json정보를 가져온다", async () => {
    const accessTokenFileDto = await fileService.getAccessToken();

    expect(accessTokenFileDto.accessToken).toBeNonEmptyString();
})