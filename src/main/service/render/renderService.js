import {logger} from '../../utils/logger.js';
import {stringUtils} from '../../utils/stringUtils.js';
import * as Showdown from 'showdown';

const showDown = new Showdown.Converter();
showDown.setOption('omitExtraWLInCodeBlocks', true);
showDown.setOption('simpleLineBreaks', true);
showDown.setOption('tables', true);
showDown.setFlavor('github');

class RenderService {

    /**
     *
     * @param {MarkdownRenderDto} markdownRenderDto
     * @returns {string}
     */
    toHtml(markdownRenderDto) {
        const markdownContent = markdownRenderDto.content;
        if(stringUtils.isBlank(markdownContent)) {
            logger.info('Markdown Content is Empty.');
            return markdownContent;
        }

        const html = showDown.makeHtml(markdownContent);
        return `<article class="markdown-body entry-content" itemprop="text"> ${html} </article>`;
    }

}

const renderService = new RenderService();

export {renderService}