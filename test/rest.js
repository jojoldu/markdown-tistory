/**
 * Created by jojoldu@gmail.com on 2017-01-16
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

const request = require('request');
const fs = require('fs');
const path = require('path');

const csses = ['github-markdown.css', 'hljs-github.min.css', 'pilcrow.css'];
const api = 'https://www.tistory.com/apis/post/attach';

const posting = function () {
    for(let i=0;i<csses.length;i++){
        const css = path.join(__dirname, './css/'+csses[i]);

        fs.readFile(css, 'utf8', function (err, data) {
            if (err) {
                print.red('There is no access token information \nPlease run markdown-tistory init');
                throw err;
            }

            const formData = {
                "access_token":'637ee738cf951b7db6171d0927512907_6f98ed27364d59618af4241257b31011',
                "blogName":'jojoldu',
                "targetUrl":'jojoldu',
                "uploadedfile":fs.createReadStream(css),
                "output":"json"
            };

            request.post({url:api, formData:formData}, function (err, response, body) {
                if(err) {
                    console.log(err);
                    resolve(false);
                }else{
                    const result = JSON.parse(body);

                    if(result.tistory.status == 200){
                        console.log(result.tistory.url);
                    }else{
                        console.log(result.tistory['error_message']);
                    }
                }
            });
        });
    }
};

posting();