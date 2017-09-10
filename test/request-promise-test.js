/**
 * Created by jojoldu@gmail.com on 2017. 9. 10.
 * Blog : http://jojoldu.tistory.com
 * Github : http://github.com/jojoldu
 */

const requestPromise = require('request-promise');
const xml2js = require('xml2js-es6-promise');
const assert = require('assert');

describe('request-promise', ()=>{
   describe('promise chain 테스트', ()=>{
       const URL = 'http://jojoldu.tistory.com/rss';

       it('rss를 받아서 타이틀만 뽑는다.', (done)=>{
           requestPromise(URL)
               .then((xml)=>{
                    console.log('get RSS');
                    return xml2js(xml);
               })
               .then((json)=>{
                    console.log('get JSON');
                    assert.equal(json.rss.channel[0].title[0], '기억보단 기록을');
                    done();
               });
       });
   });
});