import {fileService} from 'src/main/service/file/fileService';

test("실행위치 기준에서 마크다운 파일 정보를 가져온다", async () => {
    const filePath = './src/test/service/file/PARSER.md';
    const markdownFile = await fileService.getMarkdownFile(filePath);

    expect(markdownFile.path).toBe('./src/test/service/file/PARSER.md');
    expect(markdownFile.title).toBe('PARSER');
    expect(markdownFile.content).toContain('Java (2/6)');
})


