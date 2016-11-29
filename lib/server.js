var fs = require('fs');
var express = require('express');
var serveIndex = require('serve-index');
var buildHtml = require('./editor-template.js');

module.exports = {
  start: function(options, callback) {
    var app = express();

    app.get('/*.md$', function (req, res) {
      var path = options.targetPath + req.path;
      if(fs.existsSync(path)) {
        fs.readFile(path, (function(req, res) {
          return function (err, content) {
            if (err) {
              throw err;
            }
            res.send(buildHtml(req.path, content));
          };
        })(req, res));
      } else {
        res.send(buildHtml(req.path, '<!--New File-->'));
      }
    });

    app.post('/save', function(req, res) {
      req.body = '';
      req.on('data', function(data) {
        req.body += data;
      });

      req.on('end', (function(req, res) {
        return function() {
          var data = JSON.parse(req.body);
          fs.writeFile(options.targetPath + data.path, data.data, 'utf8', (function(req, res) {
            return function(err) {
              if (err) throw err;
              res.send(data.path);
            };
          })(req, res));
        };
      })(req, res));
    });

    app.use('/assets', express.static(__dirname + '/frontend/build'));
    app.use('/assets', express.static(__dirname + '/static'));

    app.use(express.static(options.targetPath));
    app.use('/', serveIndex(options.targetPath, {'icons': true}));

    app.listen(options.port, function () {
      console.log('Listening on port ' + options.port + '!');
      callback();
    });
  }
};
