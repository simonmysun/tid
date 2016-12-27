import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import twemoji from 'twemoji';
import md1 from 'markdown-it-footnote';
import md2 from 'markdown-it-sup';
import md3 from 'markdown-it-sub';
import md4 from 'markdown-it-mathjax';
import md5 from 'markdown-it-emoji';
import md6 from 'markdown-it-toc-and-anchor';

const md = new MarkdownIt({
  html: true,
  langPrefix: true,
  linkify: true,
  typographer: true,
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${hljs.highlight(lang, str, true).value}</code></pre>`;
      } catch (__) {
      }
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
  },
});

md.use(md1)
  .use(md2)
  .use(md3)
  .use(md4({
    beforeInlineMath: '<span>\\(',
    afterInlineMath: '\\)</span>',
    beforeDisplayMath: '<span>\\[',
    afterDisplayMath: '\\]</span>',
  }))
  .use(md5)
  .use(md6, {
    tocFirstLevel: 2,
    tocLastLevel: 4,
    anchorLink: false,
  });

md.renderer.rules.emoji = (token, idx) => twemoji.parse(token[idx].content);

export default md;
