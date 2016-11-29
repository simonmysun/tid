var MarkdownIt = require('markdown-it');
var hljs = require('highlight.js');
var md = new MarkdownIt({
  html: true,
  langPrefix: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(lang, str, true).value +
               '</code></pre>';
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});

md.use(require('markdown-it-footnote'))
  .use(require('markdown-it-sup'))
  .use(require('markdown-it-sub'))
  .use(require('markdown-it-mathjax'))
  .use(require('markdown-it-emoji'))
  .use(require("markdown-it-anchor"))
  .use(require("markdown-it-table-of-contents"));

var twemoji = require('twemoji');
md.renderer.rules.emoji = function(token, idx) {
  return twemoji.parse(token[idx].content);
};


module.exports = {
  render: function(editor) {
    editor.tokens = md.parse(editor.editor.getValue(), {});
    editor.previewContent.innerHTML = md.renderer.render(editor.tokens, md.options, {});
  }
};

