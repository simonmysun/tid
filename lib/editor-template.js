var escapeHtml = require('escape-html');

module.exports = function(path, content) {
  return `<html>
    <head>
        <meta charset="utf-8">
        <title>${path}</title>
    </head>
    <body>
        <div id="config"><a href="#" class="btn" id="btn-update">FORCE UPDATE</a> Markdown Parsing Time: <span id="markdown-time">0</span>ms. Mathjax Parse Time: <span id='mathjax-time'>0</span>ms. Scroll Preview Generating time <span id='thumbnail-time'>0</span>ms. <a href="#" class="btn" id="btn-save">SAVE</a></div>
        <div id="wrapper">
            <div id="source" class="content split split-horizontal">${escapeHtml(content)}</div>
            <div id="preview" class="content split split-horizontal"><div class="marked" id="preview-content"></div></div>
            <div id="scroll-thumb" class="noselect"><img id="scroll-thumb-img"><div id="preview-viewport"></div></div>
        </div>
        <script type="text/javascript" src="/assets/mathjax.js/unpacked/MathJax.js?config=default"></script>
        <script type="text/javascript" src="/assets/scripts.js" charset="utf-8"></script>
    </body>
</html>
`;
};
