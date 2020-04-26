import {imageService} from 'src/main/service/image/imageService';

test("티스토리에 이미지가 업로드 된다", async () => {
    const filePath = '/Users/idong-uk/Documents/git/markdown-tistory/src/test/resources/PARSER.md';
    const image1 = './images/티스토리.png';

    const imageUrls = await imageService._toTistoryUrl(filePath, [image1]);

    expect(imageUrls[0].tistoryFileUrl).toContain('http');
})
