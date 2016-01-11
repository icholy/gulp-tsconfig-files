
var through = require('through'),
    fs      = require('fs'),
    path    = require('path');

module.exports = function (options) {

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

  if (typeof options.newline_eof === 'undefined') {
    options.newline_eof = false;
  }

  if (typeof options.relative_dir === 'undefined') {
    options.relative_dir = '.';
  }

  if (typeof options.posix === 'undefined') {
    options.posix = false;
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
    if (options.newline_eof) {
      data += "\n";
    }
    fs.writeFile(options.path, data, callback);
  };

  var files = [];

  var handle = function (file) {
    var filePath = file.path;
    if (options.absolute) {
      filePath = path.resolve(filePath);
    } else {
      filePath = path.relative(options.relative_dir, filePath);
    }
    if (options.posix) {
      filePath = path.posix.normalize(filePath);
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
        _this.emit('end');
      });
    });
  };

  return through(handle, end);
};
