/**
 * Created by jojoldu@gmail.com on 2017. 9. 8.
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

const githubMarkdownRender = require('github-markdown-render');
const fileFinder = require('../lib/file-finder');

fileFinder.findMarkdownFile((markDownFile)=>{
    githubMarkdownRender(markDownFile.data)
        .then(data => console.log(data));
});

