const gulp = require('gulp')
const concat = require('gulp-concat')
const less = require('gulp-less')
const uglify = require('gulp-uglify')
const cleanCSS = require('gulp-clean-css')
const merge = require('gulp-merge-json')
const clean = require('gulp-clean')
const minifyCss = require('gulp-cssnano')
const rename = require('gulp-rename')

gulp.task('less', () => gulp.src('./public/less/style.default.less')
    .pipe(concat('style.default.css'))
    .pipe(less())
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('./build/css'))
)

gulp.task('bootstrap', () => gulp.src('./public/css/bootstrap.css')
  .pipe(minifyCss())
  .pipe(rename({extname: '.min.css' }))
  .pipe(gulp.dest('./build/css'))
)

gulp.task('scripts', () => gulp.src('./public/client/front.js')
    .pipe(concat('front.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'))
)

gulp.task('i18n-json-merge:en', ['clean:i18n-json:en'], () => gulp.src('./locales/en/**/*.json')
  .pipe(merge({ fileName: 'translation.json' }))
  .pipe(gulp.dest('locales/en'))
)

gulp.task('i18n-json-merge:pt', ['clean:i18n-json:pt'], () => gulp.src('./locales/pt/**/*.json')
  .pipe(merge({ fileName: 'translation.json' }))
  .pipe(gulp.dest('locales/pt'))
)

gulp.task('i18n-json-merge:es', ['clean:i18n-json:es'], () => gulp.src('./locales/es/**/*.json')
  .pipe(merge({ fileName: 'translation.json' }))
  .pipe(gulp.dest('locales/es'))
)

gulp.task('clean:i18n-json:en', () => gulp.src('./locales/en/translation.json', { read: false })
  .pipe(clean())
)

gulp.task('clean:i18n-json:pt', () => gulp.src('./locales/pt/translation.json', { read: false })
  .pipe(clean())
)

gulp.task('clean:i18n-json:es', () => gulp.src('./locales/es/translation.json', { read: false })
  .pipe(clean())
)

gulp.task('watchers', () => {
  gulp.watch('./public/less/**/*.less', ['less'])
  gulp.watch('./public/js/front.js', ['scripts'])
  gulp.watch('./locales/**/**.json', ['i18n-json-merge:en', 'i18n-json-merge:pt', 'i18n-json-merge:es'])
})

gulp.task('default', ['less', 'bootstrap', 'i18n-json-merge:en', 'i18n-json-merge:pt', 'i18n-json-merge:es'])

gulp.task('dev', ['less', 'bootstrap', 'scripts', 'i18n-json-merge:en', 'i18n-json-merge:pt', 'i18n-json-merge:es', 'watchers'])
