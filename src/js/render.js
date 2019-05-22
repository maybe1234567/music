/*页面渲染 */
(function ($, root) {
    //图片渲染
    function renderImg(src) {
        var img = new Image();
        img.src = src;
        img.onload = function () {
            $('.img-box img').attr('src', src)
            root.blurImg(img, $('body')); //高斯模糊处理
        }
    }
    //歌曲信息
    function renderInfo(info) {
        var str = '<p>' + info.song + '</p>\
            <span>' + info.singer + '</span>';
        $('.song-info').html(str);
    }
    //心动歌曲
    function renderIsLike(like) {
        if (like) {
            $('.control .btn.like').addClass('liking');
        } else {
            $('.control .btn.like').removeClass('liking');
        }
    }
    //歌曲时长
    function renderTime(time) {
        var minutes = Math.floor(time / 60),
            second = time - minutes * 60;
        $('.pro .all-time').text(minutes + ':' + second);
        setInterval(function () {
            var currentTime = parseInt(Audio.audio.currentTime);
            $('.cur-time').html(parseInt(currentTime / 60) + ':' + (currentTime % 60 / 100).toFixed(2).slice(-2));
            if (Audio.audio.currentTime == Audio.audio.duration) { //歌曲播放完时自动切歌
                $('.next').trigger('click');
            }
            $('.progress-bar').css('width', width * Audio.audio.currentTime / Audio.audio.duration)

        }, 1000)
    }

    //将各个渲染函数封装挂载在全局player对象上，获取到数据后执行该函数。
    root.render = function (data) {
        renderImg(data.image);
        renderInfo(data);
        renderIsLike(data.isLike)
        renderTime(data.duration);
    }
}(window.Zepto, window.player || (window.player = {})));