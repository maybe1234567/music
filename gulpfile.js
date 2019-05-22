//gulp配置文件
const gulp = require('gulp');
/*html压缩 */
const htmlclean = require('gulp-htmlclean')
/*图片压缩 */
const imageMin = require('gulp-imagemin')
/*js压缩 */
const uglify = require('gulp-uglify')
/*去除debug语句 */
const debug = require('gulp-strip-debug')
/*less > css */
const less = require('gulp-less')
/* css压缩*/
const cssclean = require('gulp-clean-css')
/*css前缀预处理 */
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
/*开启服务器 */
const connect = require('gulp-connect')
//文件路径
var folder = {
    src: 'src/',
    dist: 'dist/',
}
//环境变量
var devMod = process.env.NODE_DEV ;
console.log(devMod)
gulp.task('html', function () {
    gulp.src(folder.src + 'html/*')
        .pipe(connect.reload())
        .pipe(htmlclean())
        .pipe(gulp.dest(folder.dist + 'html/'))
})
gulp.task('css', function () {
    gulp.src(folder.src + "css/*")
        .pipe(connect.reload())
        .pipe(less())
        .pipe(postcss([autoprefixer()]))
        .pipe(cssclean())
        .pipe(gulp.dest(folder.dist + 'css/'))
})
gulp.task('js', function () {
    var page = gulp.src(folder.src + 'js/*')
        .pipe(connect.reload())
    if (!devMod) {
        page.pipe(debug())
            .pipe(uglify())
    }
    page.pipe(gulp.dest(folder.dist + 'js/'))
})
gulp.task('images', function () {
    gulp.src(folder.src + 'images/*')
        .pipe(imageMin())
        .pipe(gulp.dest(folder.dist + 'images'))
})
gulp.task('sever', function () {
    connect.server({
        port: 8097,
        livereload: true //自动刷新
    })
})
/*监听任务*/
gulp.task('watch', function () {
    gulp.watch(folder.src + 'html/*', ['html'])
    gulp.watch(folder.src + 'css/*', ['css'])
    gulp.watch(folder.src + 'js/*', ['js'])
})
gulp.task('default', ['html', 'css', 'js', 'images', 'sever', 'watch']);