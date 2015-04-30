# Tsconfig Glob

> Populate the tsconfig `files` array using a glob

``` js

var tsconfigGlob = require('gulp-tsconfig-glob');

gulp.task('tsconfig_files', function () {
  gulp.src(['scripts/**/*.ts'])
    .pipe(tsconfigGlob({
      absolute: true,        // default: false
      path: 'tsconfig.json', // default: 'tsconfig.json'
      indent: 2,             // default: 2
    }));
})

```
