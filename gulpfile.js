var gulp = require('gulp');

//connect
var connect = require('gulp-connect-multi')();

gulp.task('connect', connect.server({
	host: '127.0.0.1',
	root: ['site'],
	livereload: true,
	port: 9090
}));

var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
gulp.task('styles', function() {
	gulp.src('./dev/style.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(prefix('last 2 version'))
		.pipe(gulp.dest('./site/'))
		.pipe(connect.reload());
});

//templates

var htmlmin = require('gulp-htmlmin');

gulp.task('tempates', function() {
	gulp.src('./dev/*.html')
		.pipe(htmlmin({
			collapseWhitespace: true
		}))

		.pipe(gulp.dest('./site/'))
		.pipe(connect.reload());
});

//scripts

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('scripts', function() {
	gulp.src('./dev/js/*.js')
		.pipe(concat('script.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./site/'))
		.pipe(connect.reload());
});

//watcher

gulp.task('watcher', function() {
	gulp.watch('./dev/*.html', ['tempates']);
	gulp.watch('./dev/scss/*.scss', ['styles']);
	gulp.watch('./dev/js/*.js', ['scripts']);
});

gulp.task('default', ['styles', 'tempates', 'scripts']);

gulp.task('dev', ['default', 'connect', 'watcher']);