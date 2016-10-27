const gulp = require('gulp');
const clean = require('./gulp/clean');
const scripts = require('./gulp/scripts');
const shaders = require('./gulp/shaders');
const styles = require('./gulp/styles');
const watch = require('./gulp/watch');

gulp.task('clean', clean);
gulp.task('scripts', scripts);
gulp.task('shaders', shaders);
gulp.task('styles', styles);

gulp.task('build', gulp.series('clean', gulp.parallel('scripts', 'shaders', 'styles')));
gulp.task('default', gulp.series('build'));

gulp.task('watch', gulp.series('default', watch));
