'use strict';

var gulp = require('gulp'), //основной плагин gulp
    watch = require('gulp-watch'), //расширение возможностей watch
    prefixer = require('gulp-autoprefixer'), //расставление автопрефиксов
    uglify = require('gulp-uglify'), //минификация js
    jshint = require("gulp-jshint"), //отслеживание ошибкок в js
    sass = require('gulp-sass'), //компиляция scss
    sourcemaps = require('gulp-sourcemaps'), //sourcemaps
    rigger = require('gulp-rigger'), //работа с инклюдами в html и js
    cleanCSS = require('gulp-clean-css'), //минификация css
    imagemin = require('gulp-imagemin'), //минимизация изображений
    pngquant = require('imagemin-pngquant'), //дополнения к предыдущему плагину, для работы с PNG
    rimraf = require('rimraf'), //очистка
    rename = require("gulp-rename"), //переименвоание файлов
    plumber = require("gulp-plumber"), //предохранитель для остановки гальпа
    browserSync = require("browser-sync"), //с помощью этого плагина мы можем легко развернуть локальный dev сервер с блэкджеком и livereload, а так же с его помощью мы сможем сделать тунель на наш localhost, что бы легко демонстрировать верстку заказчику
    reload = browserSync.reload;

var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: { //Пути откуда брать исходники
        html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'src/js/main.js',//В стилях и скриптах нам понадобятся только main файлы
        jshint: 'src/js/*.js',
        style: 'src/style/main.scss',
        img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: 'src/fonts/**/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};

// Создадим переменную с настройками нашего dev сервера
var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Devil"
};

//создадим локальный сервер
gulp.task('webserver', function () {
    browserSync(config);
});

// таск для билдинга html
gulp.task('html:build', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.html)) //выгрузим их в папку build
        .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});

// проверка js на ошибки и вывод их в консоль
gulp.task('jshint:build', function() {
    return gulp.src(path.src.jshint) //выберем файлы по нужному пути
        .pipe(jshint()) //прогоним через jshint
        .pipe(jshint.reporter('jshint-stylish')); //стилизуем вывод ошибок в консоль
});

// билдинг js
gulp.task('js:build', function () {
    gulp.src(path.src.js) //Найдем наш main файл
        .pipe(rigger()) //Прогоним через rigger
        .pipe(sourcemaps.init()) //Инициализируем sourcemap
        .pipe(uglify()) //Сожмем наш js
        .pipe(sourcemaps.write()) //Пропишем карты
        .pipe(rename({suffix: '.min'})) //добавим суффикс .min к выходному файлу
        .pipe(gulp.dest(path.build.js)) //выгрузим готовый файл в build
        .pipe(reload({stream: true})); //И перезагрузим сервер
});

// билдинг пользовательского css
gulp.task('style:build', function () {
    gulp.src(path.src.style) //Выберем наш основной файл стилей
        .pipe(sourcemaps.init()) //инициализируем soucemap
        .pipe(sass()) //Скомпилируем
        .pipe(prefixer()) //Добавим браузерные префиксы
        .pipe(cleanCSS()) //Сожмем
        .pipe(sourcemaps.write()) //пропишем sourcemap
        .pipe(rename({suffix: '.min'})) //добавим суффикс .min к имени выходного файла
        .pipe(gulp.dest(path.build.css)) //выгрузим в build
        .pipe(reload({stream: true})); //перезагрузим сервер
});

// билдим статичные изображения
gulp.task('image:build', function () {
    gulp.src(path.src.img) //Выберем наши картинки
        .pipe(imagemin({ //Сожмем их
            progressive: true, //сжатие .jpg
            svgoPlugins: [{removeViewBox: false}], //сжатие .svg
            use: [pngquant()], //сжатие .png
            interlaced: true, //сжатие .gif
            optimizationLevel: 4 //степень сжатия от 0 до 7
        }))
        .pipe(gulp.dest(path.build.img)) //выгрузим в build
        .pipe(reload({stream: true})); //перезагрузим сервер
});

// билдим шрифты
gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts)) //выгружаем в build
});


// билдим все
gulp.task('build', [
    'html:build',
    'jshint:build',
    'js:build',
    'style:build',
    'image:build'
    // 'fonts:build'
]);

// чистим папку билда
gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

// watch
gulp.task('watch', function(){
     //билдим html в случае изменения
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
     //билдим css в случае изменения
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
     //проверяем js в случае изменения
    watch([path.watch.js], ['jshint']);
     //билдим js в случае изменения
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
     //билдим статичные изображения в случае изменения
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
     //билдим шрифты в случае изменения
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});

// действия по умолчанию
gulp.task('default', ['build', 'webserver', 'watch']);
