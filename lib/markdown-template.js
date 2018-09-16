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

exports.template = async (markdownText, adsenseCode) => {
    if(adsenseCode){
        return new Promise((resolve)=>{
            resolve(templateByAdsenseCode(markdownText, adsenseCode));
        });
    }
    const asCode = await getAdsenseCode();
    const result = templateByAdsenseCode(markdownText, asCode);
    return new Promise((resolve) => {
        resolve(result);
    });

};

const templateByAdsenseCode = (markdownText, code) => {
    const articleStart = '<article class="markdown-body entry-content" itemprop="text"> ',
        articleEnd = ' </article>';
    const exchangedAdsense = code? exchangeGoogleAdsense(markdownText, code) : markdownText;
    return articleStart + converter.makeHtml(exchangedAdsense) + articleEnd;
}

const exchangeGoogleAdsense = (markdownText, adsenseCode) => {
    if(!adsenseCode){
        print.red('Not Found Google Adsense Code');
        return markdownText;
    }

    return markdownText.replace(/\[\[ad\]\]/g, adsenseCode);
};

const getAdsenseCode = async () => {
    const adCode = await tokenManager.getAdTxt();
    return new Promise((resolve) => {
        resolve(adCode);
    });
};

exports.exchangeGoogleAdsense = exchangeGoogleAdsense;
