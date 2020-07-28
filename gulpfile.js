var gulp = require('gulp');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var nano = require('gulp-cssnano');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();

/**
 * Copy html files
 */
gulp.task('copy', () => 
  gulp 
    .src('app/*.html')
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({
      stream: true
    }))
)

/**
 * Compile sass files
 */
gulp.task('sass', () =>
  gulp
    .src('app/src/styles/scss/*.scss')
    .pipe(concat('main.css'))
    .pipe(sass())
    .pipe(nano())
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.reload({
      stream: true
    }))
)

/**
 * Initiate browser-sync
 */
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
  })
})

/**
 * Transpile JS files
 */
gulp.task("js", () => {
  return gulp.src("app/src/scripts/*.js")
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest("dist/js/"))
    .pipe(browserSync.reload({
      stream: true
    }))

});

gulp.task('watch', ['browserSync', 'sass', 'js', 'copy'], () => {
  gulp.watch('app/*.html', ['copy'])
  gulp.watch('app/src/scripts/*.js', ['js'])
  gulp.watch('app/src/styles/scss/*.scss', ['sass'])
})

gulp.task('default', ['watch'])
