
var through = require('through'),
    fs      = require('fs'),
    path    = require('path');

module.exports = function(options) {

  if (typeof options === 'undefined') {
    options = {};
  }

  if (typeof options.path === 'undefined') {
    options.path = 'tsconfig.json';
  }

  if (typeof options.indent === 'undefined') {
    options.indent = 2;
  }

  if (typeof options.absolute === 'undefined') {
    options.absolute = false;
  }

  var readConfig = function (callback) {
    fs.readFile(options.path, function (err, data) {
      if (err) {
        callback(err, null)
      } else {
        try {
          callback(null, JSON.parse(data));
        } catch (err) {
          callback(err, null);
        }
      }
    });
  };

  var writeConfig = function (config, callback) {
    try {
      var data = JSON.stringify(config, null, options.indent);
    } catch (err) {
      callback(err);
      return;
    }
    fs.writeFile(options.path, data, callback);
  };

  var files = [];

  var handle = function (file) {
    var filePath = file.path;
    if (options.absolute) {
      filePath = path.resolve(filePath);
    } else {
      filePath = path.relative('.', filePath);
    }
    files.push(filePath);
    this.emit('data', file);
  };


  var end = function () {
    var _this = this;
    readConfig(function (err, config) {
      if (err) { throw err; }
      config.files = files;
      writeConfig(config, function (err) {
        if (err) { throw err; }
      });
    });
  };

  return through(handle, end);
};
