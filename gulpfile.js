const gulp = require('gulp');
const fileInclude = require ('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const server = require('gulp-server-livereload');
const clean = require('gulp-clean');
const fs = require('fs');
const sourceMaps = require('gulp-sourcemaps');
// const groupMedia = require('gulp-group-css-media-queries');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

//таск clean который будет удалять папку dist
gulp.task('clean', function(done){
    if (fs.existsSync('./dist/')){
    return gulp
    .src('./dist/', {read:false})
    .pipe(clean({force:true}));
    }
    done();
})
const fileIncludeSetting = {
    prefix:'@@',
    basepath:'@file'
}

gulp.task('html', function(){
    return gulp.src('./src/*.html')//от куда взяли
    .pipe(fileInclude(fileIncludeSetting))// обработали
    .pipe(gulp.dest('./dist/'))//сохранили
});

//таска для компиляуии scss
gulp.task('sass', function(){
    return gulp
    .src('./src/scss/*.scss')
    .pipe(sourceMaps.init())//gulp-sourcemaps инициализируем
    .pipe(sass())//sass превращаем в css
    // .pipe(groupMedia())
    .pipe(sourceMaps.write())//gulp-sourcemaps пишим
    .pipe(gulp.dest('./dist/css/'));
})

//таска для копирования изображений
gulp.task('images', function(){
    return gulp.src('./src/img/**/*').pipe(gulp.dest('./dist/img/'))
})

//таск для сервера
const serverOptions = {
    livereload: true,
    open: true
};

gulp.task('server', function(){
    return gulp.src('./dist/').pipe(server(serverOptions));
});

//следим и запускаем соответөщую таску
gulp.task('watch', function(){
    gulp.watch('./src/scss/**/*.scss', gulp.parallel('sass'));
    gulp.watch('./src/**/*.html', gulp.parallel('html'));
    gulp.watch('./src/img/**/*', gulp.parallel('images'));
});

//дефолтная таска, кот запускает всю сборку
gulp.task('default', gulp.series(
    'clean', 
    gulp.parallel('html', 'sass', 'images'),
    gulp.parallel('server', 'watch'),
));