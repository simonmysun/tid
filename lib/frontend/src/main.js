require("!style!css!./main.css");
var layoutInit = require('./layout.js').init;
layoutInit();

var editor = require('./editor.js');
editor.init();

var timestamp = {
  markdown: {
    start: 0,
    end: 0,
    el: document.getElementById('markdown-time')
  },
  mathjax: {
    start: 0,
    end: 0,
    el: document.getElementById('mathjax-time')
  },
  thumbnail: {
    start: 0,
    end: 0,
    el: document.getElementById('thumbnail-time')
  },
};

var renderer = require('./renderer.js');
var update = function() {
  timestamp.markdown.start = new Date().getTime();
  renderer.render(editor);
  timestamp.markdown.end = new Date().getTime();
  timestamp.markdown.el.innerHTML = timestamp.markdown.end - timestamp.markdown.start;
  timestamp.mathjax.start = new Date().getTime();
  MathJax.Hub.Queue(["Typeset", MathJax.Hub, 'preview']);
  MathJax.Hub.Queue(function() {
    timestamp.mathjax.end = new Date().getTime();
    timestamp.mathjax.el.innerHTML = timestamp.mathjax.end - timestamp.mathjax.start;
    timestamp.thumbnail.start = new Date().getTime();
    editor.getThumbnail(editor, function(success) {
      timestamp.thumbnail.end = new Date().getTime();
      if(!success) {
        timestamp.thumbnail.el.innerHTML = '(failed)' + (timestamp.thumbnail.end - timestamp.thumbnail.start);
      } else {
        timestamp.thumbnail.el.innerHTML = timestamp.thumbnail.end - timestamp.thumbnail.start;
      }
    });
  });
};

MathJax.Hub.Config({
  extensions: ["tex2jax.js"],
  jax: ["input/TeX", "output/HTML-CSS"],
  tex2jax: {
    inlineMath: [ ['$','$'], ["\\(","\\)"] ],
    displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
    processEscapes: false
  },
  "HTML-CSS": { availableFonts: ["TeX"] }
});

var rendering = (function() {
  var status = false;
  return {
    getStatus: function() {
      return status;
    },
    setStatus: function(signal) {
      status = signal;
      return status;
    }
  }
})();

var $btnUpdate = document.getElementById('btn-update');
$btnUpdate.addEventListener('click', function(event) {
  rendering.setStatus(true);
  update();
  event.preventDefault();
});
var $btnSave = document.getElementById('btn-save');
var xhr = require("xhr");
$btnSave.addEventListener('click', function(event) {
  update();
  xhr.post('/save', {
    body: JSON.stringify({
      path: location.pathname,
      data: editor.editor.getValue()
    })
  }, function (err, resp) {
    if(err) {
      alert('Failed! ');
    }
    console.log(resp.statusCode);
  });
  event.preventDefault();
});

update();

