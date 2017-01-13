/**
 * Created by jojoldu@gmail.com on 2017-01-12
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

const fs = require('fs');
const path = require('path');
const toMarkdown = require('to-markdown');
const parseString = require('xml2js').parseString;
const showdown  = require('showdown'),
    converter = new showdown.Converter();

const jsonPath = path.join(__dirname, "../");
const url = 'https://www.tistory.com/apis/post/read';
const xml = '<?xml version="1.0" encoding="utf-8"?> <tistory> <status>200</status> <item><url>http://oauth.tistory.com</url><secondaryUrl></secondaryUrl><id>1</id><title><![CDATA[티스토리 OAuth2.0 API 오픈!]]></title><content><![CDATA[안녕하세요 Tistory API 입니다.<br /><br />이번에 Third-party Developer 용 <b>Tistory OAuth 2.0 API</b> 가 오픈됩니다.<br />Tistory 회원이라면, 여러분의 모든 app에 자유롭게 활용하실 수 있습니다.<br /><br /><div class="imageblock center" style="text-align: center; clear: both;"> <img alt="이미지" src="http://cfile10.uf.tistory.com/image/156987414DAF9799227B34" ></div><br /><p></p>많은 기대와 사랑 부탁드립니다.&nbsp;<br />&nbsp;]]></content><categoryId>0</categoryId><postUrl>http://oauth.tistory.com/1</postUrl><visibility>0</visibility><acceptComment>1</acceptComment><acceptTrackback>1</acceptTrackback><tags><tag>open</tag><tag>api</tag></tags><comments>0</comments><trackbacks>0</trackbacks><date>1303352668</date></item></tistory>';

parseString(xml, function (err, result) {
    const html = result.tistory.item[0].content[0];
    const markdown = toMarkdown(html);
    console.log(converter.makeHtml(markdown));

    fs.writeFile(jsonPath+'blog.md', JSON.stringify(markdown), 'utf8', function(err){
        if(err){
            console.log('An error occurred while writing markdown file ');
            throw err;
        }
        console.log('Completed markdown\n');
        process.exit();
    });

});
