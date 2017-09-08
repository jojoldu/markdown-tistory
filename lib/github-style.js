/**
 * Created by jojoldu@gmail.com on 2017-01-23
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */


const apply = function (body) {
    const articleStart = '<article class="markdown-body entry-content" itemprop="text"> ',
        articleEnd = '</article>';
    return articleStart+body+articleEnd;
};

exports.apply = apply;