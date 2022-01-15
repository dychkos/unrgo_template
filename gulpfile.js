const 
	gulp = require('gulp'),
	sass = require('gulp-sass')(require('sass')),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	browsersync = require('browser-sync').create(),
	del = require('del'),
	rename = require('gulp-rename'),
	cssnano = require('gulp-cssnano'),
	cleanCSS = require('gulp-clean-css'),
	notify = require("gulp-notify");

function browserSync(done) {
	browsersync.init({
	server: {
		baseDir: "./app"
	},
		notify: false
	});
	done();
}

function reload(done) {
	browsersync.reload();
	done();
}

function compileCSSlibs() {
	return gulp.src('app/css/libs/*.css')
		.pipe(concat('libs.css'))
		.pipe(cssnano())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('app/css'));
}

function compileScripts() {
	return gulp.src([
		'app/js/libs/jquery-3.6.0.min.js',
		'app/js/libs/popper.min.js',
		'app/js/libs/bootstrap.min.js'
	])
	.pipe(concat('libs.min.js'))
	.pipe(gulp.dest('app/js'));
}

function compileSass(done) {
  return gulp.src('app/scss/main.scss')
    .pipe(sass().on("error", notify.onError()))
    .pipe(rename({suffix: '.min', prefix : ''}))
    .pipe(autoprefixer(['last 15 versions', '>1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('app/css'))
	.pipe(browsersync.stream());
  
	done();
}



function watchFiles(done) {
	gulp.watch('app/scss/**/*.scss', gulp.series(compileSass));
	gulp.watch('app/*.html', browsersync.reload);
	gulp.watch('app/css/*.css', browsersync.reload);
	gulp.watch('app/js/**/*.js', browsersync.reload);
  
  	done();
}


function removeDist(done) {
	del.sync('dist');
	done();
}

function moveFontsToDist(done) {
	return gulp.src([
		'app/fonts/**/*'
	]).pipe(gulp.dest('dist/fonts'));
	done();
}

function moveImgToDist(done) {
	return gulp.src([
		'app/img/*',
		'app/img/**/*'
	]).pipe(gulp.dest('dist/img'));
	done();
}

function moveHtmlToDist(done) {
	return gulp.src('app/*.html').pipe(gulp.dest('dist'));
	done();
}

function moveCssToDist(done) {
	return gulp.src([ 
		'app/css/*.css'
	]).pipe(gulp.dest('dist/css'));

	done();
}

function moveJSToDist(done) {
	return gulp.src([
		'app/js/*.js'
	]).pipe(gulp.dest('dist/js'));

	done();
}

function prepareHTML(done){
	return gulp.src(['app/*.html'])
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(gulp.dest('./'));

	done();
}

function htmlProcess(done) {
	return gulp.src('src/*.html')
		.pipe(posthtml([include()]))
		.pipe(gulp.dest('dist'))

	done();
}

gulp.task('build',  
	gulp.series(
		removeDist,compileSass, compileCSSlibs, compileScripts,
		moveFontsToDist, moveImgToDist, moveHtmlToDist, moveCssToDist, moveJSToDist
	), function(done) {
		done();
	}
);

const taskBuild = gulp.series('build');
const taskWatch = gulp.series(compileScripts, compileCSSlibs, watchFiles, browserSync);

exports.build = taskBuild;
exports.default = taskWatch;