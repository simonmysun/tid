var chokidar = require('chokidar');
var fs = require('fs');
var path = require('path');

var watcher;
var watchPath;
var fileChangeEventHandlers = {};

var updateItem = function(id) {
  item = fileChangeEventHandlers[id];
  var target = path.resolve(watchPath, item.path);
  if(['jpg', 'jpeg', 'webp', 'gif', 'png', 'tiff', 'svg', 'bmp', 'ico', 'webm', 'ogg', 'mp4', 'aac', 'mp3', 'wav'].indexOf(item.path.split('.').pop().toLowerCase()) !== -1) {
    item.update({
      status: '200',
      content: 'media',
      path: item.path
    });
    return;
  }
  if(fs.existsSync(target)) {
    fs.readFile(target, 'utf8', (function(item) {
      return function(err, content) {
        item.update({
          status: '200',
          content: content,
          path: item.path
        });
      };
    })(item));
  } else {
    item.update({
      status: '404',
      content: 'Not found. ',
      path: item.path
    });
  }
};

module.exports = {
  setWatchPath: function(path) {
    watchPath = path;
  },
  addListener: function(id, item) {
    fileChangeEventHandlers[id] = item;
  },
  setPath: function(id, filePath) {
    fileChangeEventHandlers[id].path = filePath;
    fileChangeEventHandlers[id].watcher = chokidar.watch(path.resolve(watchPath, filePath), {
      persistent: true,
      ignoreInitial:true
    }).on('all', (function(id) {
      return function(event, filePath) {
        updateItem(id);
      };
    })(id));
  },
  removeListener: function(id) {
    fileChangeEventHandlers[id].watcher.close();
    delete fileChangeEventHandlers[id];
  },
  forceUpdate: function(id) {
    updateItem(id);
  }
};
