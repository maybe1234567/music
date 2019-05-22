/*入口文件*/
var root = window.player; //全局player对象
var dataList = '';
var len = '';
var nowIndex = 0;
var Audio = root.AudioManger; //音频控制对象
var width = $('.pro-wrap')[0].clientWidth;
var timer = '';
var str = '';

/*获取数据 */
function getData(url) {
    $.ajax({
        type: 'GET',
        url: url,
        success: function (data) {
            dataList = data;
            len = data.length;
            root.render(data[0]); //渲染图片+歌曲信息+歌曲时长+心动歌曲
            Audio.getAudio(dataList[0].audio); //默认加载第一条音频数据
            musicList(data);//渲染音乐列表
            bindEvent();//绑定事件
        }
    })
}
getData('../mock/data.json')



// renderList(data);
/*交互事件 */
function bindEvent() {
    /*按钮切歌-前一首 */
    $('.prev').on('click', function () {
        if (nowIndex == 0) {
            nowIndex = len - 1;
        } else {
            nowIndex--;
        }
        playing(nowIndex);
    })


    /*按钮切歌-后一首 */
    $('.next').on('click', function () {
        if (nowIndex == len - 1) {
            nowIndex = 0;
        } else {
            nowIndex++;
        }
        playing(nowIndex);
    })


    /*播放&暂停 */
    $('.play').on('click', function (src) {
        if (Audio.status == 'pause') {
            Audio.play();
            var deg = $('.img-box').attr('data-deg');//图片默认旋转角度为0
            rotated(deg)
        } else {
            Audio.pause()
            clearInterval(timer);
        }
        $(this).toggleClass('playing')
    })


    /*点赞*/
    $('.like').on('click', function () {
        $(this).toggleClass('liking')
    })


    /*音乐列表切歌 */
    $('.list').on('click', function (e) {
        e.stopPropagation();
        $(this).next().animate({
            bottom: 0
        }, 200, 'linear');
    })
    $('.music-list li').on('click', function (e) {
        // e.stopPropagation();
        $('.music-list').animate({
            bottom: -300
        }, 200, 'linear')
        var index = $(this).attr('data-id');
        playing(index);
    })
    $('.wrapper').on('click', function (e) {
        // e.stopPropagation();
        $('.music-list').animate({
            bottom: -300
        }, 200, 'linear')

    })
    /*进度条操作*/
    $('.pro-wrap').on('click', function (e) {
        var location = e.offsetX;
        duration = Audio.audio.duration;
        var targetTime = location / width * duration;
        Audio.audio.currentTime = targetTime;
        $(this).find('.progress-bar').css({
            'width': location
        })
    })
}




/*播放音乐 */
function playing(index) {
    root.render(dataList[index]);//渲染对应歌曲信息
    Audio.getAudio(dataList[index].audio);//加载对应歌曲
    Audio.play();//歌曲播放
    $('.play').addClass('playing')
    $('.img-box').css({
        'transform': 'rotateZ(' + 0 + 'deg)',
        'transition': 'none'
    })
    rotated(0);
}



/*图片旋转 */
function rotated(deg) {
    deg = +deg;
    clearInterval(timer);
    timer = setInterval(function () {
        deg += 2;
        $('.img-box').css({
            'transform': 'rotateZ(' + deg + 'deg)',
            'transition': 'all 1s ease-out '
        }).attr('data-deg', deg)
    }, 80)
}

//音乐列表渲染
function musicList(data) {
    data.forEach(function (ele, index) {
        str += '<li  data-id = ' + index + '>\
             <span>' + ele.song + '</span>\
             <span class = "singer">' + '-' + ele.singer + '</span>\
         </li>'
    })
    $('.music-list').html(str);
}