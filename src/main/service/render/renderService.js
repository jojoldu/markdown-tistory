import {logger} from '../../utils/logger';
const { isBlank } = require('npm-stringutils');

const Showdown = require('showdown');

const showDown = new Showdown.Converter();
showDown.setOption('omitExtraWLInCodeBlocks', true);
showDown.setOption('simpleLineBreaks', true);
showDown.setOption('tables', true);
showDown.setFlavor('github');

class RenderService {

    /**
     *
     * @param {string} content
     * @returns {string}
     */
    toHtml(content) {
        if(isBlank(content)) {
            logger.info('Markdown Content is Empty.');
            return content;
        }
        
        return `<article class="markdown-body entry-content" itemprop="text"> ${showDown.makeHtml(content)} </article>`;
    }

}

const renderService = new RenderService();

export {renderService}