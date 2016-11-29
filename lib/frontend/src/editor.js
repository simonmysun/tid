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
var $scrollThumb = document.getElementById('scroll-thumb-img');
var $scrollThumbContainer = document.getElementById('scroll-thumb');
var $source = document.getElementById('source');
var editor = ace.edit('source');

var scrollMap = function(y) {
  return y;
};

function init() {
  editor.getSession().setMode('ace/mode/markdown');
  editor.setTheme('ace/theme/chrome');
  editor.getSession().setUseWrapMode(true);

  var scrollTarget = 0;
  var scrolls = {
    editor: {
      getCurrent: function() {
        return editor.renderer.scrollTop
      },
      getTotal: function() {
        return editor.renderer.layerConfig.maxHeight - editor.container.offsetHeight;
      },
      to: function(ratio) {
        editor.renderer.scrollToY(scrollMap(ratio) * this.getTotal());
      }
    },
    preview: {
      getCurrent: function() {
        return $preview.scrollTop;
      },
      getTotal: function() {
        return $preview.scrollHeight - $preview.offsetHeight;
      },
      to: function(ratio) {
        $preview.scrollTop = ratio * this.getTotal();
      }
    },
    thumb: {
      getCurrent: function() {
        return $previewViewport.offsetTop;
      },
      getTotal: function() {
        return $scrollThumbContainer.scrollHeight - $previewViewport.offsetHeight;
      },
      to: function(ratio) {
        $previewViewport.style.top = ratio * this.getTotal() + 'px';
        if($previewViewport.offsetTop < $scrollThumbContainer.scrollTop + 50) {
          $scrollThumbContainer.scrollTop = $previewViewport.offsetTop - 50;
        } else if($previewViewport.offsetTop + $previewViewport.offsetHeight > $scrollThumbContainer.scrollTop + $scrollThumbContainer.offsetHeight - 50) {
          $scrollThumbContainer.scrollTop = $previewViewport.offsetTop + $previewViewport.offsetHeight - $scrollThumbContainer.offsetHeight + 50;
        }
        $previewViewport.style.height = $previewViewport.offsetWidth * ($preview.offsetHeight / $preview.offsetWidth) + 'px';
      }
    }
  };

  var scrollSync = (function() {
    scrollTarget = (function(a, b) {
      return function(x) {
        return Math.min(Math.max(x, a), b);
      };
    })(0, 1)(scrollTarget);
    var sourceDirection = 'none';
    var timer = null;
    return (function(clear) {
      return function(sourceDir) {
        if(sourceDirection === 'none') {
          sourceDirection = sourceDir;
        }
        if(sourceDirection === sourceDir) {
          clearTimeout(timer);
          timer = setTimeout(clear, 300);
          switch(sourceDirection) {
            case 'editor':
              scrolls.preview.to(scrollTarget);
              scrolls.thumb.to(scrollTarget);
              break;
            case 'preview':
              scrolls.preview.to(scrollTarget);
              scrolls.editor.to(scrollTarget);
              scrolls.thumb.to(scrollTarget);
              break;
            case 'thumb':
              scrolls.editor.to(scrollTarget);
              scrolls.preview.to(scrollTarget);
              scrolls.thumb.to(scrollTarget);
              break;
            default:
              break;
          }
        }
      };
    })(function () {
      sourceDirection = 'none';
    });
  })();

  editor.getSession().on('changeScrollTop', function(scroll) {
    scrollTarget = scroll / scrolls.editor.getTotal();
    scrollSync('editor');
  });
  require('./addWheelListener')($preview, function(e) {
    scrollTarget = (scrolls.preview.getCurrent() + e.deltaY) / scrolls.preview.getTotal();
    scrollSync('preview');
    event.preventDefault();
  });
  $preview.addEventListener('keydown', function(event) {
    switch(event.key) {
      case 'PageUp':
        scrollTarget = (scrolls.preview.getCurrent() - $preview.clientHeight) / scrolls.preview.getTotal();
        scrollSync('preview');
        event.preventDefault();
        break;
      case 'PageDown':
        scrollTarget = (scrolls.preview.getCurrent() + $preview.clientHeight) / scrolls.preview.getTotal();
        scrollSync('preview');
        event.preventDefault();
        break;
      case 'ArrowUp':
        scrollTarget = (scrolls.preview.getCurrent() - 15) / scrolls.preview.getTotal();
        scrollSync('preview');
        event.preventDefault();
        break;
      case 'ArrowUp':
        scrollTarget = (scrolls.preview.getCurrent() + 15) / scrolls.preview.getTotal();
        scrollSync('preview');
        event.preventDefault();
        break;
      default:
        break;
    }
  });
  $preview.addEventListener('mousemove', function(event) {
    if(event.buttons === 1 && event.clientY > $preview.clientHeight + 15) {
      scrollTarget = (scrolls.preview.getCurrent() + 15) / scrolls.preview.getTotal();
      scrollSync('preview');
      return ;
    }
    if(event.buttons === 1 && event.clientY < 45) {
      scrollTarget = (scrolls.preview.getCurrent() - 15) / scrolls.preview.getTotal();
      scrollSync('preview');
      return ;
    }
  });
  (function() {
    var touchStartY = null;
    var touchScrollY = 0;
    $preview.addEventListener('touchstart', function(e) {
      touchStartY = e.touches[0].pageY;
      scrollInitY = scrolls.preview.getCurrent();
    });
    $preview.addEventListener('touchend touchcancel', function(e) {
      touchStartY = null;
    });
    $preview.addEventListener('touchmove', function(e) {
      if (!touchStartY) {
        e.preventDefault();
        return ;
      }
      scrollTarget = (scrollInitY + (touchStartY - e.touches[0].pageY)) / scrolls.preview.getTotal();
      scrollSync('preview');
      e.preventDefault();
    });
  })();
  $previewViewport.style.top = '0px';
  
  (function() {
    var touchMoveListener = function(e) {
      $previewViewport.style.top = (function(a, b) {
        return function(x) {
          return Math.min(Math.max(x, a), b);
        };
      })(0, $scrollThumbContainer.scrollHeight - $previewViewport.offsetHeight)($scrollThumbContainer.scrollTop + (e.touches[0].pageY - 30) - $previewViewport.offsetHeight / 2) + 'px';
      scrollTarget = scrolls.thumb.getCurrent() / scrolls.thumb.getTotal();
      scrollSync('thumb');
      e.preventDefault();
    };
    var destroyTouchMoveListener = function(e) {
      window.removeEventListener('touchmove', touchMoveListener);
      window.removeEventListener('touchend', destroyTouchMoveListener);
      window.removeEventListener('touchcancel', destroyTouchMoveListener);
    };
    $scrollThumbContainer.addEventListener('touchstart', function(e) {
      window.addEventListener('touchmove', touchMoveListener);
      window.addEventListener('touchend', destroyTouchMoveListener);
      window.addEventListener('touchcancle', destroyTouchMoveListener);
      e.preventDefault();
    });
  })();
  
  (function() {
    var mouseMoveListener = function(e) {
      $previewViewport.style.top = (function(a, b) {
        return function(x) {
          return Math.min(Math.max(x, a), b);
        };
      })(0, $scrollThumbContainer.scrollHeight - $previewViewport.offsetHeight)($scrollThumbContainer.scrollTop + (e.pageY - 30) - $previewViewport.offsetHeight / 2) + 'px';
      scrollTarget = scrolls.thumb.getCurrent() / scrolls.thumb.getTotal();
      scrollSync('thumb');
      e.preventDefault();
    };
    var destroyMouseMoveListener = function(e) {
      if (e.type === 'mouseout') {
        if(!(e.toElement == null && e.relatedTarget == null)) {
          return ;
        }
      }
      window.removeEventListener('mousemove', mouseMoveListener);
      window.removeEventListener('mouseout', destroyMouseMoveListener);
      window.removeEventListener('mouseup', destroyMouseMoveListener);
    };
    $scrollThumbContainer.addEventListener('mousedown', function(e) {
      window.addEventListener('mousemove', mouseMoveListener);
      window.addEventListener('mouseout', destroyMouseMoveListener);
      window.addEventListener('mouseup', destroyMouseMoveListener);
      e.preventDefault();
    });
  })();
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

