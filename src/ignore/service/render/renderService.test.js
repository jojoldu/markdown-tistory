import {renderService} from 'src/main/service/render/renderService';
import {MarkdownRenderDto} from "../../../main/service/render/dto/MarkdownRenderDto";

test("마크다운 문법이 HTML로 변환된다", () => {
    const markdownText = '```java String a="10"```';

    const result = renderService.toHtml(new MarkdownRenderDto(markdownText, ''));

    expect(result).toContain('<article class="markdown-body entry-content" itemprop="text">');
    expect(result).toContain('<p><code>java String a="10"</code></p>');
})

test.each([
    [null],
    [""],
    [undefined],
])('빈값이 가면 그대로 반환된다 markdownText=%s', (markdownText) => {
    const result = renderService.toHtml(markdownText);
    expect(result).toBe(result);
});