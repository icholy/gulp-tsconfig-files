
var through = require('through'),
    fs      = require('fs'),
    path    = require('path');

var defaults = {
  path:         'tsconfig.json',
  index:        2,
  newline_eof:  false,
  absolute:     false,
  relative_dir: '.',
  posix:        false
};

module.exports = function (options) {

  if (typeof options === 'undefined') {
    options = {};
  }

  Object.keys(defaults).forEach(function (key) {
    if (typeof options[key] !== 'undefined') {
      options[key] = defaults[key];
    }
  });

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
      config.files = files.sort();
      writeConfig(config, function (err) {
        if (err) { throw err; }
        _this.emit('end');
      });
    });
  };

  return through(handle, end);
};
