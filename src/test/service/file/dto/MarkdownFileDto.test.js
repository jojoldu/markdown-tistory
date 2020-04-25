import {MarkdownFileDto} from "src/main/service/file/dto/MarkdownFileDto";
import {ImagePathUrlDto} from "src/main/service/image/dto/ImagePathUrlDto";

test("기존 파일의 이미지 로컬주소가 URL로 교체된다", () => {
    const imageUrls = [
        new ImagePathUrlDto('target1', 'expect1'),
        new ImagePathUrlDto('target2', 'expect2')
    ];
    const content = `test image1 ${imageUrls[0].localFilePath} test image2 ${imageUrls[1].localFilePath}`;
    const markdownFileDto = new MarkdownFileDto('', '', content);

    markdownFileDto.replaceAllImagePath(imageUrls);

    expect(markdownFileDto.content).toContain(imageUrls[0].tistoryFileUrl);
    expect(markdownFileDto.content).toContain(imageUrls[1].tistoryFileUrl);

    expect(markdownFileDto.content).not.toContain(imageUrls[0].localFilePath);
    expect(markdownFileDto.content).not.toContain(imageUrls[1].localFilePath);
})