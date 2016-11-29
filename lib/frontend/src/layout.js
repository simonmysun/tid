var Split = require('split.js');

function init() {
  Split(['#source', '#preview'], {
    direction: 'horizontal',
    sizes: [27, 66],
    gutterSize: 8,
    cursor: 'row-resize',
    minSize: 10,
    onDragEnd: function () {
      window.dispatchEvent(new Event('resize'));
    }
  });
};

exports.init = init;

