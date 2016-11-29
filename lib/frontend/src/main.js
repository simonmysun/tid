require("!style!css!./main.css");
var notify = require('./notify.js');
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
var renderState = {
  rendering: false,
  rerender: false
};
var update = function() {
  if(renderState.rendering) {
    notify('Busy rendering. Will rerender after finished. ', 'info', 1000);
    renderState.rerender = true;
    return ;
  }
  renderState.rendering = true;
  editor.editor.changed = false;
  timestamp.markdown.start = new Date().getTime();
  renderer.render(editor);
  timestamp.markdown.end = new Date().getTime();
  timestamp.markdown.el.innerHTML = timestamp.markdown.end - timestamp.markdown.start;
  notify('Markdown rendered. ', 'success', 1000);
  timestamp.mathjax.start = new Date().getTime();
  MathJax.Hub.Queue(["Typeset", MathJax.Hub, 'preview']);
  MathJax.Hub.Queue(function() {
    timestamp.mathjax.end = new Date().getTime();
    notify('MathJax rendered. ', 'success', 1000);
    timestamp.mathjax.el.innerHTML = timestamp.mathjax.end - timestamp.mathjax.start;
    timestamp.thumbnail.start = new Date().getTime();
    editor.getThumbnail(editor, function(success) {
      timestamp.thumbnail.end = new Date().getTime();
      if(!success) {
        timestamp.thumbnail.el.innerHTML = '(failed)' + (timestamp.thumbnail.end - timestamp.thumbnail.start);
        notify('Document too long to rendered thumbnail', 'warning', 1500);
      } else {
        timestamp.thumbnail.el.innerHTML = timestamp.thumbnail.end - timestamp.thumbnail.start;
        notify('Thumbnail rendered. ', 'success', 1000);
      }
      renderState.rendering = false;
      if(renderState.rerender) {
        renderState.rerender = false;
        update();
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

var $btnUpdate = document.getElementById('btn-update');
$btnUpdate.addEventListener('click', function(event) {
  update();
  event.preventDefault();
});
var $btnSave = document.getElementById('btn-save');
var xhr = require("xhr");
var saving = false;
$btnSave.addEventListener('click', function(event) {
  if(editor.editor.changed) {
    update();
  }
  if(saving) {
    notify('Busy communicating with the server.', 'warning', 1500);
  } else {
    saving = true;
    xhr.post('/save', {
      body: JSON.stringify({
        path: location.pathname,
        data: editor.editor.getValue()
      })
    }, function (err, res) {
      saving = false;
      if(err) {
        notify('Failed to save!', 'danger', 3000);
      }
      notify('Saved successfully.', 'success', 1000);
    });
  }
  event.preventDefault();
});

update();

