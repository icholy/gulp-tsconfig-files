# Tsconfig Files

> Populate the tsconfig `files` array using a glob

## Note: TypeScript 2 supports using globs in `tsconfig.json`

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
  absolute:     true,            // default: false
  path:         'tsconfig.json', // default: 'tsconfig.json'
  indent:       2,               // default: 2
  newline_eof:  true,            // default: false
  relative_dir: 'some/folder/',  // default: '.'
  posix:        true,            // default: false
  sort:         false            // default: true
}
```
