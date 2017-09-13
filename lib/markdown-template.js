/**
 * Created by jojoldu@gmail.com on 2017-01-23
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

const print = require('./print');
const Showdown = require('showdown');
Showdown.setOption('tables', true);
Showdown.setOption('simpleLineBreaks', true);
Showdown.setOption('omitExtraWLInCodeBlocks', true);
Showdown.setFlavor('github');
const converter = new Showdown.Converter();

const template = function (markdownText, adsenseCode) {
    const articleStart = '<article class="markdown-body entry-content" itemprop="text"> ',
        articleEnd = ' </article>';
    const exchangedAdsense = exchangeGoogleAdsense(markdownText, adsenseCode);
    return articleStart+converter.makeHtml(exchangedAdsense)+articleEnd;
};

const exchangeGoogleAdsense = function (markdownText, adsenseCode) {
    if(!adsenseCode){
        print.red('Not Found Google Adsense Code');
        return markdownText;
    }

    return markdownText.replace(/\[\[ad\]\]/g, adsenseCode);
};

exports.template = template;
exports.exchangeGoogleAdsense = exchangeGoogleAdsense;