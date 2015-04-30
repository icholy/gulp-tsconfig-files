# Tsconfig Files

> Populate the tsconfig `files` array using a glob

``` js

var tsconfig = require('gulp-tsconfig');

gulp.task('tsconfig_files', function () {
  gulp.src(['scripts/**/*.ts'])
    .pipe(tsconfig({
      absolute: true,            // default: false
      path:     'tsconfig.json', // default: 'tsconfig.json'
      indent:   2,               // default: 2
    }));
});

```
