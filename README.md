# Tsconfig Files

> Populate the tsconfig `files` array using a glob

## Example

``` js
var tsconfig = require('gulp-tsconfig-files');

gulp.task('tsconfig_files', function () {
  gulp.src(['scripts/**/*.ts'])
    .pipe(tsconfig());
});
```

## Options

``` js
{
  absolute: true,            // default: false
  path:     'tsconfig.json', // default: 'tsconfig.json'
  indent:   2,               // default: 2
}
```
