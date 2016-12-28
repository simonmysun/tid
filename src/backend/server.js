var express = require('express');
var http = require('http');
var path = require('path');
var serveIndex = require('serve-index');
var socketio = require('socket.io');
var fileChange = require('./fileChange.js');

module.exports = {
  start: function(options, callback) {
    var app = express();
    var server = http.createServer(app).listen(options.port);
    var io = socketio(server);

    app.use('/', express.static(__dirname + '/../../static'));
    app.use('/', express.static(__dirname + '/../../lib'));

    app.use('/', serveIndex(options.targetPath, {
      icons: true
    }));

    app.get('/*', function(req, res, nxt) {
      if(req.query.raw === 'true') {
        nxt();
        return ;
      }
      if(req.get('Accept')[0] === 't') { // Tricky and not reliable
        res.redirect('/_viewer.html#' + req.path);
        return ;
      }
      nxt();
    });
    
    app.use(express.static(options.targetPath));

    fileChange.setWatchPath(options.targetPath);
    io.on('connection', function(socket) {
      console.log(socket.id + ' is a new connection');
      fileChange.addListener(socket.id, {
        path: '',
        update: (function() {
          return function(result) {
            console.log('File updated: ', result.path);
            socket.emit('update', {
              status: result.status,
              content: result.content,
              path: result.path
            });
          };
        })(socket)
      });
      socket.on('subscribe file change', function(data) {
        console.log(socket.id + ' subscribes ' + data.path);
        if(data.path[0] === '/') {
          data.path = data.path.slice(1);
        }
        var resolvedPath = path.resolve(options.targetPath, data.path);
        if(resolvedPath.slice(0, options.targetPath.length) !== options.targetPath) {
          console.error('Error: Illegal access. ');
          socket.emit('update', {
            status: '400',
            content: '',
            path: data.path
          });
          socket.disconnect;
          return;
        }
        fileChange.setPath(socket.id, data.path);
        fileChange.forceUpdate(socket.id);
      });
      socket.on('disconnect', function() {
        console.log(socket.id + ' disconnected!');
        fileChange.removeListener(socket.id);
      });
    });
    console.log('Listening on port ' + options.port + '!');
    callback();
  }
};
