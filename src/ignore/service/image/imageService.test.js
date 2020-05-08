import {imageService} from 'src/main/service/image/imageService';
import {fileService} from "../../../main/service/file/fileService";

test("[마크다운파일 기준 상대경로] 티스토리에 이미지가 업로드 된다", async () => {
    const filePath = '/Users/idong-uk/Documents/git/markdown-tistory/src/test/resources/PARSER.md';
    const image1 = './images/티스토리.png';

    const imageUrls = await imageService._toTistoryUrl(filePath, [image1]);

    expect(imageUrls[0].tistoryFileUrl).toContain('http');
})

test("[절대경로] 티스토리에 이미지가 업로드 된다", async () => {
    const blogJson = await fileService.getBlog();
    const tokenJson = await fileService.getAccessToken();
    const fullPath = '/Users/idong-uk/Documents/git/markdown-tistory/src/test/resources/images/코디미.png';

    const response = await imageService._uploadFile(fullPath, tokenJson.accessToken, blogJson.blogName);

    console.log(response.url);
    expect(response.isOk()).toBe(true);
})
