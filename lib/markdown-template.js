/**
 * Created by jojoldu@gmail.com on 2017-01-23
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

const Showdown  = require('showdown');
Showdown.setOption('tables', true);
Showdown.setOption('simpleLineBreaks', true);
showdown.setFlavor('github');
const converter = new Showdown.Converter();

const template = function (markdown) {
    const body = converter.makeHtml(markdown);
    const articleStart = '<article class="markdown-body entry-content" itemprop="text"> ',
        articleEnd = ' </article>';
    return articleStart+body+articleEnd;
};

exports.template = template;