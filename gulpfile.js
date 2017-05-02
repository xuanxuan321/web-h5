var gulp = require('gulp');
var csso = require('gulp-csso');
var filter = require('gulp-filter');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');

gulp.task('default', function() {
  // 将你的默认的任务代码放在这
  var jsFilter=filter('**/*.js',{restore:true});
  var cssFilter=filter('**/*.css',{restore:true});
  var indexHtmlFilter=filter(['**/*','!**/index.html'],{restore:true});
  return gulp.src('index.html')
  .pipe(useref())
  .pipe(jsFilter)
  .pipe(uglify())
  .pipe(jsFilter.restore)
  .pipe(cssFilter)
  .pipe(csso())
  .pipe(cssFilter.restore)
  .pipe(indexHtmlFilter)
  .pipe(rev())
  .pipe(indexHtmlFilter.restore)
  .pipe(revReplace())
  .pipe(gulp.dest('dist'))

});
