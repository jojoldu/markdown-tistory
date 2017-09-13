/**
 * Created by jojoldu@gmail.com on 2017. 9. 13.
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

const markdownTemplate = require('../lib/markdown-template');
const assert = require('assert');

const ADSENSE_CODE = '<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>\n' +
    '<!-- 반응형 -->\n' +
    '<ins class="adsbygoogle"\n' +
    '     style="display:block"\n' +
    '     data-ad-client="ca-pub-5349709105365293"\n' +
    '     data-ad-slot="5488859360"\n' +
    '     data-ad-format="auto"></ins>\n' +
    '<script>\n' +
    '(adsbygoogle = window.adsbygoogle || []).push({});\n' +
    '</script>';

describe('구글광고코드가 추가된다', ()=>{
    describe('템플릿 코드를 구글광고 코드로 교체한다', ()=>{
        it('[[ad]] 코드는 입력한 구글 광고 코드로 교체된다', ()=>{
            const markdownText = '[[ad]]';
            const exchangedText = markdownTemplate.exchangeGoogleAdsense(markdownText, ADSENSE_CODE);
            assert.ok(exchangedText.startsWith('<script'));
        });

        it('마크다운 코드 사이에서 [[ad]]코드 찾아서 교체해준다', ()=>{
            const markdownText = '# Hello World  [[ad]]   ```java String a="10"```';
            const exchangedText = markdownTemplate.exchangeGoogleAdsense(markdownText, ADSENSE_CODE);
            assert.equal(exchangedText, '# Hello World  '+ADSENSE_CODE+'   ```java String a="10"```');
        });

        it('마크다운 템플릿된 결과에 구글광고코드가 있다.', ()=>{
            const markdownText = '# Hello World  [[ad]]   ```java String a="10"```';
            const templatedText = markdownTemplate.template(markdownText, ADSENSE_CODE);
            assert.equal(templatedText, '<article class="markdown-body entry-content" itemprop="text"> <h1 id="hello-world--script-async-srcpagead2googlesyndicationcompageadjsadsbygooglejsscript">Hello World  <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script></h1>\n' +
                '<!-- 반응형 -->\n' +
                '<p><ins class="adsbygoogle"\n' +
                '     style="display:block"\n' +
                '     data-ad-client="ca-pub-5349709105365293"\n' +
                '     data-ad-slot="5488859360"\n' +
                '     data-ad-format="auto"></ins></p>\n' +
                '<script>\n' +
                '(adsbygoogle = window.adsbygoogle || []).push({});\n' +
                '</script>\n' +
                '<p><code>java String a="10"</code></p> </article>');
        });
    });
});