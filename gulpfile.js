var gulp = require('gulp');
var changed = require('gulp-changed');
// var uglify = require('gulp-uglify');
// var minify_css = require('gulp-minify-css');
var scss = require('gulp-sass');
var lr = require('tiny-lr')();

var port = 35729;
var css_source = './assets/css/**/*';
var js_source = './assets/js/**/*';
var scss_source = './assets/scss/**/*'
var views_directory = './views/**/*';

gulp.task('default', function(){

	lr.listen(port);

	gulp.watch(scss_source, function(){
		gulp.run('scss');
	});

	gulp.watch(views_directory, notify);
	gulp.watch(css_source, notify);

	// gulp.watch(css_source, function(){
	// 	gulp.run('minify');
	// });

	// gulp.watch(js_source, function(){
	// 	gulp.run('uglify');
	// });

});

// gulp.task('minify', function(){
// 	gulp.src([css_source])
// 		.pipe(minify_css())
// 		.pipe(gulp.dest('./assets/min/css/'));
// });

// gulp.task('uglify', function(){
// 	gulp.src([js_source])
// 		.pipe(uglify())
// 		.pipe(gulp.dest('./assets/min/js/'));
// });


gulp.task('scss', function(){
	gulp.src([scss_source])
		.pipe(scss())
		.pipe(gulp.dest('./assets/css/'));
});

function scss(event){
	console.log('stuff');
	console.log( require('path').relative('/', event.path) );
}

function notify(event){
	var file_name = require('path').relative('/', event.path);

	lr.changed({
		body: {
			files: [file_name]
		}
	});
	// console.log(file_name+' updated');
}