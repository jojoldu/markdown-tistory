import {fileService} from 'src/main/service/file/fileService';

test("실행위치 기준에서 마크다운 파일 정보를 가져온다", async () => {
    const filePath = './src/test/service/file/PARSER.md';
    const markdownFile = await fileService.getMarkdown(filePath);

    expect(markdownFile.path).toBe('./src/test/service/file/resources/PARSER.md');
    expect(markdownFile.title).toBe('PARSER');
    expect(markdownFile.content).toContain('Java (2/6)');
})

test("지정된 위치의 blog.json 파일을 가져온다", async () => {
    const jsonPath = './src/test/service/file/resources/blog.json';
    const blog = await fileService._getJson(jsonPath);

    expect(blog.blogName).toBe('jojoldu');
    expect(blog.clientId).toBe('clientId');
    expect(blog.secretKey).toBe('secretKey');
})

test("지정된 위치의 token.json 파일을 가져온다", async () => {
    const jsonPath = './src/test/service/file/resources/token.json';
    const token = await fileService._getJson(jsonPath);

    expect(token.accessToken).toBe('accessToken');
})

