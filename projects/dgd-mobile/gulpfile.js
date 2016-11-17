var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var autoprefixer= require('gulp-autoprefixer'),
    base64      = require('gulp-base64'),
    postcss     = require('gulp-postcss'),
    px2rem      = require('postcss-px2rem');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch("app/scss/*.scss", ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    var processors = [px2rem({remUnit: 75})];
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(postcss(processors))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(base64())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});

// autoprefixer
// gulp.task('testAutoFx', function () {
//   gulp.src('app/css/*.css')
//     .pipe(autoprefixer({
//         browsers: ['last 2 versions', 'Android >= 4.0'],
//         cascade: true, //是否美化属性值 默认：true 像这样：
//         //-webkit-transform: rotate(45deg);
//         //        transform: rotate(45deg);
//         remove:true //是否去掉不必要的前缀 默认：true
//     }))
//     .pipe(gulp.dest('app/dist/css'));
// });
gulp.task('default', ['serve']);