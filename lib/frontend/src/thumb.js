var rasterizeHTML = require('rasterizehtml');

var recreateNode = function(node) {
  switch(node.nodeType) {
    case 1:
      var result = '';
      result += '<' + node.nodeName;
      result += ' style="' + getComputedStyle(node).cssText + '"';
      switch(node.nodeName) {
        case 'IMG':
          result += ' src = "' + node.getAttribute('src') + '"';
        default:
          break;
      }
      result += '>';
      var child=node.firstChild;
      while(child !== null) {
        result += recreateNode(child);
        child=child.nextSibling;
      }
      if(node.nodeName !== 'IMG') {
        result += '</' + node.nodeName + '>';
      }
      return result;
    case 3:
      return node.textContent;
    default:
      break;
  }
};

module.exports = function(editor, callback) {
  var width = editor.preview.scrollWidth;
  var height = editor.preview.scrollHeight;
  var scale = document.body.clientWidth * 0.1 / width;
  if(height * scale >= 16384) {
    callback(false);
    return;
  }
  var canvas = document.createElement('canvas');
  canvas.width = width * scale;
  canvas.height = height * scale;
  var recreatedHTML = recreateNode(editor.previewContent);
  rasterizeHTML.drawHTML(recreatedHTML).then((function(canvas, width, height, scale, callback) {
    return function(renderResult) {
      var ctx = canvas.getContext('2d');
      ctx.drawImage(renderResult.image, 0, 0, width, height, 0, 0, width * scale, height * scale);
      editor.scrollThumb.src = canvas.toDataURL();
      callback(true);
    };
  })(canvas, width, height, scale, callback));
};

