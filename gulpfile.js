const gulp = require('gulp');
const fileInclude = require ('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));


const fileIncludeSetting = {
    prefix:'@@',
    basepath:'@file'
}

gulp.task('includeFiles', function(){
    return gulp.src('./src/*.html')//от куда взяли
    .pipe(fileInclude(fileIncludeSetting))// обработали
    .pipe(gulp.dest('./dist/'))//сохранили
});

//таска для компиляуии scss
gulp.task('sass', function(){
    return gulp.src('./src/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist/css/'))
})

