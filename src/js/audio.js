/*音频控制*/
(function ($, root) {
    function AudioManger() {
        /*创建音频对象 */
        this.audio = new Audio();
        //audio默认暂停状态
        this.status = 'pause';
    }

    AudioManger.prototype = {
        play: function () {
            this.audio.play();
            this.status = 'play';
        },
        pause: function () {
            this.audio.pause();
            this.status = 'pause';
        },
        getAudio: function (src) {
            this.audio.src = src;
            this.audio.load();//加载音频
        }
    }
    root.AudioManger = new AudioManger();
})(window.Zepto, window.player || (window.player = {}))