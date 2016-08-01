/**
 * Task automation
 */
import gulp from 'gulp';
import util from 'gulp-util';
import eslint from 'gulp-eslint';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';

const ignoreNodeModules = '!.node_modules/**/*.js';
const ignoreThirdPartyLibraries = '!./js/lib/**/*.js';
const allJavascriptFiles = './js/linework/**/*.js';
const jsSources = [ignoreNodeModules, ignoreThirdPartyLibraries, allJavascriptFiles];

gulp.task('lint', cb =>
  gulp.src(jsSources)
    .pipe(eslint())
    .pipe(eslint.format())
    .on('error', util.log)
);

gulp.task('scripts', ['lint'], () =>
  browserify('./js/linework/linework.js', {
    standalone: 'Linework',
    debug: true
  })
  .bundle()
  .pipe(source('linework.min.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init())
  // .pipe(uglify())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./dist/'))
);

gulp.task('watch', () =>
  gulp.watch(allJavascriptFiles, ['scripts'])
);

gulp.task('default', ['scripts', 'watch']);
