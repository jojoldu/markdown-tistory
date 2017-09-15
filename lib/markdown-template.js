/**
 * Created by jojoldu@gmail.com on 2017-01-23
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

const print = require('./print');
const tokenManager = require('./token-manager');
const Showdown = require('showdown');
Showdown.setOption('tables', true);
Showdown.setOption('simpleLineBreaks', true);
Showdown.setOption('omitExtraWLInCodeBlocks', true);
Showdown.setFlavor('github');
const converter = new Showdown.Converter();

exports.template = function (markdownText, adsenseCode) {
    if(adsenseCode){
        return new Promise((resolve)=>{
            resolve(templateByAdsenseCode(markdownText, adsenseCode));
        });
    }

    return getAdsenseCode()
        .then((code)=>{
            const result = templateByAdsenseCode(markdownText, code);

            return new Promise((resolve)=>{
                resolve(result);
            });
        });
};

function templateByAdsenseCode(markdownText, code) {
    const articleStart = '<article class="markdown-body entry-content" itemprop="text"> ',
        articleEnd = ' </article>';
    const exchangedAdsense = code? exchangeGoogleAdsense(markdownText, code) : markdownText;
    return articleStart + converter.makeHtml(exchangedAdsense) + articleEnd;
}

const exchangeGoogleAdsense = function (markdownText, adsenseCode) {
    if(!adsenseCode){
        print.red('Not Found Google Adsense Code');
        return markdownText;
    }

    return markdownText.replace(/\[\[ad\]\]/g, adsenseCode);
};

const getAdsenseCode = function () {
    return tokenManager.getAdTxt()
        .then((data)=>{
            return new Promise((resolve)=>{
                resolve(data);
            });
        });
};

exports.exchangeGoogleAdsense = exchangeGoogleAdsense;
