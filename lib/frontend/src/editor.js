var ace = require('brace');
require('brace/mode/markdown');
require('brace/theme/chrome');

var throttle = function (callback, delay, maxDelay, init, destroy) {
  var timer = null;
  var startTime;
  return function () {
    var context = this;
    var args = arguments;
    var currentTime = new Date().getTime();
    clearTimeout(timer);
    if (!startTime) {
      startTime = currentTime;
      if(init) {
        init();
      }
    } else if (maxDelay && currentTime - startTime >= maxDelay) {
      callback.apply(context, args);
      startTime = currentTime;
    }
    timer = setTimeout(function () {
      callback.apply(context, args);
      startTime = null;
      if(destroy) {
        destroy();
      }
    }, delay);
  };
};

var $preview = document.getElementById('preview');
var $previewContent = document.getElementById('preview-content');
var $previewViewport = document.getElementById('preview-viewport');
var $scrollThumb = document.getElementById('scroll-thumb-img')
var $source = document.getElementById('source');
var editor = ace.edit('source');

function init() {
  editor.getSession().setMode('ace/mode/markdown');
  editor.setTheme('ace/theme/chrome');
  editor.getSession().setUseWrapMode(true);

  var scrollTarget = {
    editor: 0,
    preview: 0
  };

  var scrollSync = (function() { // token map
    var current = 'none';
    var timer = null;
    return function (trigger) {
      if(current === 'none') {
        current = trigger;
      }
      if(current === trigger) {
        clearTimeout(timer);
        timer = setTimeout(function () {
          current = 'none';
        }, 300);
        if(current === 'preview') {
          editor.renderer.scrollToY(scrollTarget.editor);
        } else {
          $preview.scrollTop = scrollTarget.preview;
          $previewViewport.style.top = ($scrollThumb.scrollHeight - $previewViewport.clientHeight) * (scrollTarget.preview / ($preview.scrollHeight - $preview.offsetHeight));
        }
      }
    };
  })();
  editor.getSession().on('changeScrollTop', function(scroll) {
    scrollTarget.preview = (
      (
        $preview.scrollHeight - $preview.offsetHeight
      ) * (
        scroll / (
          editor.renderer.layerConfig.maxHeight -
          editor.container.offsetHeight
        )
      )
    );
    scrollSync('editor');
  });
  var addWheelListener = require('./addWheelListener');
  var $previewScrollTo = function(targetY) {
    $preview.scrollTop = targetY;
    $previewViewport.style.top = ($scrollThumb.scrollHeight - $previewViewport.clientHeight) * (targetY / ($preview.scrollHeight - $preview.offsetHeight));
    scrollTarget.editor = (
      (
        editor.renderer.layerConfig.maxHeight - editor.container.offsetHeight
      ) * (
        $preview.scrollTop / (
          $preview.scrollHeight - $preview.offsetHeight
        )
      )
    );
    scrollSync('preview');
  };
  var $previewScrollFor = function(deltaY) {
    $previewScrollTo($preview.scrollTop + deltaY);
  };
  addWheelListener($preview, function(e) {
    $previewScrollFor(e.deltaY)
      event.preventDefault();
  });
  document.addEventListener('keydown', function(event) {
    var keyName = event.key;
    switch(keyName) {
      case 'PageUp':
        $previewScrollFor(-$preview.clientHeight);
        event.preventDefault();
        break;
      case 'PageDown':
        $previewScrollFor($preview.clientHeight);
        event.preventDefault();
        break;
      case 'ArrowUp':
        $previewScrollFor(-15);
        event.preventDefault();
        break;
      case 'ArrowDown':
        $previewScrollFor(15);
        event.preventDefault();
        break;
      default:
        break;
    }
  });
  $preview.addEventListener('mousemove', function(event) {
    if(event.buttons === 1 && event.clientY > $preview.clientHeight + 15) {
      $previewScrollFor(15);
      return ;
    }
    if(event.buttons === 1 && event.clientY < 45) {
      $previewScrollFor(-15);
      return ;
    }
  });
  
  var touchStartY = null;
  var touchScrollY = 0;
  $preview.addEventListener('touchstart', function(e) {
    touchStartY = e.touches[0].pageY;
    touchScrollY = this.scrollTop;
  });
  $preview.addEventListener('touchend touchcancel', function(e) {
    touchStartY = null;
  });
  $preview.addEventListener('touchmove', function(e) {
    if (!touchStartY) {
      e.preventDefault();
      return ;
    }
    $previewScrollTo(touchScrollY + touchStartY - e.touches[0].pageY);
    e.preventDefault();
  });
  var thumbTouchStartY = null;
  var thumbTouchScrollY = 0;
  $scrollThumb.addEventListener('touchstart', function(e) {
    thumbTouchStartY = e.touches[0].pageY;
    thumbTouchScrollY = $preview.scrollTop;
  });
  $scrollThumb.addEventListener('touchend touchcancel', function(e) {
    thumbTouchStartY = null;
  });
  $scrollThumb.addEventListener('touchmove', function(e) {
    if (!thumbTouchStartY) {
      e.preventDefault();
      return ;
    }
    $previewScrollTo(Math.min(Math.max(thumbTouchScrollY + (thumbTouchStartY - e.touches[0].pageY) * 5, 0), $preview.scrollHeight - $preview.clientHeight));
    e.preventDefault();
  });
  var hitY = 0;
  var startY = 0;
  $previewViewport.style.top = '0px';
  $previewViewport.style.height = $previewViewport.offsetWidth * ($preview.offsetHeight / $preview.offsetWidth) + 'px';
  var drag = function(e) {
    var result = Math.min(Math.max(startY + e.clientY - hitY, 0), $scrollThumb.scrollHeight - $scrollThumb.scrollTop - $previewViewport.clientHeight);
    $previewViewport.style.top = result + 'px';
    $previewScrollTo(result / ($scrollThumb.scrollHeight - $scrollThumb.scrollTop - $previewViewport.clientHeight) * ($preview.scrollHeight - $preview.offsetHeight));
    e.preventDefault();
  };
  var removeListeners = function() {
    this.removeEventListener('mousemove', drag);
    this.removeEventListener('mouseup', removeListeners);
    this.removeEventListener('mouseout', removeListeners);
  };
  $previewViewport.addEventListener('mousedown', function(e) {
    hitY = e.clientY;
    startY = parseFloat(this.style.top);
    e.preventDefault();
    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', removeListeners);
    window.addEventListener('mouseup', removeListeners);
  }, false);
};

module.exports = {
  init: init,
  preview: $preview,
  previewContent: $previewContent,
  scrollThumb: $scrollThumb,
  viewProgress: 0,
  source: $source,
  editor: editor,
  getThumbnail: require('./thumb.js'),
  tokens: {}
};

