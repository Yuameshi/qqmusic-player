print("网易云就是废物好吧！");
var api = document.getElementById("iframe");
var player = new QMplayer();
player.play("000WKvUf0GuCyl");
print("Initial Song Loaded！")
print("Player State:" + player.state);
msprev("Despair","LookedatHerFore","","http://39.101.194.181/proj/qqmusic/T002R300x300M000003rycDS0ktpT2_1.jpg");

window.onload=function(){
  print("Started Auto Fetching Progress...");
  setInterval(autofetchprogress,100);
}

function msprev(songname,singer,aubum,image) {
  if(!aubum){
    aubum = songname;
  }
  if ('mediaSession' in navigator){
    navigator.mediaSession.metadata = new MediaMetadata({
      title: songname,
      artist: singer,
      album: aubum,
      artwork: [{src: image, sizes: "200x200", type: "image/jpeg"}]
    });
    /*navigator.mediaSession.setActionHandler('play', function() {});
    navigator.mediaSession.setActionHandler('pause', function() {});
    navigator.mediaSession.setActionHandler('seekbackward', function() {});
    navigator.mediaSession.setActionHandler('seekforward', function() {});
    navigator.mediaSession.setActionHandler('previoustrack', function() {});
    navigator.mediaSession.setActionHandler('nexttrack', function() {});*/
  }

}


//高级的Console输出
function print(text) {
        console.log("%c QQ Music Player API：%c" + text,"border-top-left-radius:5px;border-bottom-left-radius: 5px;margin:0;padding:0;font-size:20px;font-family:'Helvetica','Arial Unicode MS';background-color:rgb(255,220,0);color:rgb(20,188,114);","font-size:20px;font-family:'Helvetica','Arial Unicode MS';background-color:rgb(17,190,115);color:rgb(255,220,0);margin:5px;margin-left:0;border-top-right-radius:5px;border-bottom-right-radius:5px;");
}


//通过ID
function throughid() {
	print("Start Running Process：throughid()");
    var iptbox = document.getElementById("iptbox");
    var ipt = iptbox.value;
    iptbox.value = "";
    if (!ipt) {
      print('Error：Empty String！');
      alert('曲目名/曲目ID不能为空！');
      return;
    }
    print("Input Box Value：" + ipt);
    player.play(ipt);
    var duration = "NaN";
    
    print('Duration:' + duration);
    /*if(duration == "NaN") {
      print("Error:Cannot Fetch Duration，Maybe Song Not Found!");
      alert('错误：无法获取曲目时长，可能没有该曲目！');
      return;
    }*/

    msprev(ipt,"Unknown Artist","Unknown Aubum","http://39.101.194.181/proj/qqmusic/throughid.jpg");
    
    var songname = document.getElementById("songname");
    songname.innerHTML = ipt;

    var title = document.getElementById("title");
    title.innerHTML = ipt + ' · QQ音乐播放器';

  	var singer = document.getElementById("singer");
  	singer.innerHTML = "未知艺术家";

    var aubum = document.getElementById("aubum");
    aubum.src = "throughid.jpg";

    var songmid = document.getElementById("songmid");
    songmid.innerHTML = "曲目ID：" + ipt;

  	var time = document.getElementById("time");
    time.innerHTML = "0s/" + player.duration + "s";
}


//通过歌名
function throughname() {
	  print("Start Running Process：throughname()");
	  var iptbox = document.getElementById("iptbox");
    var ipt = iptbox.value;
    iptbox.value = "";
    if (!ipt) {
      print('Error：Empty String！');
      alert('曲目名/曲目ID不能为空！');
      return;
    }
    var newwindow = 'https://y.qq.com/portal/search.html#page=1&searchid=1&remoteplace=txt.yqq.top&t=song&w=' + ipt;
    alert('即将打开一个新窗口，请在新窗口内选中希望播放的歌曲并使用曲目ID播放！\n如：\nURL为“https://y.qq.com/n/yqq/song/000WKvUf0GuCyl.html”\n则取“000WKvUf0GuCy”');
    window.open(newwindow,'newwindow','height=700,width=600,top=0,left=0,toolbar=no,menubar=no,scrollbars=no,resizable=no, status=no');
	  /*var script = document.createElement("script")
    script.src = `https://c.y.qq.com/soso/fcgi-bin/music_search_new_platform?searchid=53806572956004615&t=1&aggr=1&cr=1&catZhida=1&lossless=0&format=json&flag_qc=0&p=1&n=2&w=${iptbox.value}`;
    print(script);
    document.body.appendChild(script);
    print("Input Box Value：" + iptbox.value);
    alert('功能还没上线呢（咕咕咕）！');*/
}

//播放函数
function playorpause() {
	print("Try To Start Play");
	player.play();
  	var playpause = document.getElementById("playpause");
  	var state = player.state;
  	print("Status：" + state);
  	if (state=="playing") {
  		playpause.innerHTML = "||";
  	} else {
  		playpause.innerHTML = "►";
  	}

}

function fetchprogress() {
  var progress = document.getElementById("progressinner");
  var timecount = document.getElementById("time");
  print("Fetching Progress...");
  var state = player.state;
  var duration = player.duration;
  print("Duration：" + duration);
  var current = player.currentTime;
  print("Current Time：" + current);
  var wrtdura_min = Math.floor(duration / 60);
  var wrtdura_sec = Math.round(duration % 60);
  var wrtcurr_min = Math.floor(current / 60);
  var wrtcurr_sec = Math.round(current % 60);
  var wid = current / duration;
  //写进页面
  if(Math.floor(wrtcurr_sec / 10) == ""){
    var wrt = wrtcurr_min + ':0' + wrtcurr_sec + '/' + wrtdura_min + ':' +wrtdura_sec;
  } else {
    var wrt = wrtcurr_min + ':' + wrtcurr_sec + '/' + wrtdura_min + ':' +wrtdura_sec;

  }
  timecount.innerHTML = wrt;
  timecount.style.color = "#000";
  progress.style.width =  wid * 100 + "%";
}

//懒得改布局了
function autofetchprogress() {
  var progress = document.getElementById("progressinner");
  var timecount = document.getElementById("time");
  var state = player.state;
  var duration = player.duration;
  var current = player.currentTime;
  var wrtdura_min = Math.floor(duration / 60);
  var wrtdura_sec = Math.round(duration % 60);
  var wrtcurr_min = Math.floor(current / 60);
  var wrtcurr_sec = Math.round(current % 60);
  var wid = current / duration;
  //写进页面
  if(Math.floor(wrtcurr_sec / 10) == ""){
    var wrt = wrtcurr_min + ':0' + wrtcurr_sec + '/' + wrtdura_min + ':' +wrtdura_sec;
  } else {
    var wrt = wrtcurr_min + ':' + wrtcurr_sec + '/' + wrtdura_min + ':' +wrtdura_sec;

  }
  timecount.innerHTML = wrt;
  timecount.style.color = "#000";
  progress.style.width =  wid * 100 + "%";
}


function changeprogress(ev) {
    ev = ev || window.event;
    var progress = document.getElementById("progressbar");
    var progressinner = document.getElementById("progressinner");
    var outside_offsetL = document.getElementById("infocontain").offsetLeft;
    var total_offsetL = outside_offsetL + progress.offsetLeft;
    print("Total Offset=>Left:" + total_offsetL);
    var MousePosX = getMouseCoords(ev).x;
    print("Mouse Position=>X:" + MousePosX);
    print("Progress Bar=>Width:" + progress.offsetWidth);
    var inner_width = ( MousePosX - total_offsetL) / progress.offsetWidth;
    print("Progress=>Inner=>Width Will Be Changed:" + progressinner.offsetWidth / progress.offsetWidth + "%=>" + inner_width * 100 + "%");
    progressinner.style.width =  inner_width * 100 + "%";
    var target_time = player.duration * inner_width;
    print("Time Will Be Changed:" + player.currentTime + "=>" + target_time);
    player.currentTime = target_time;
    var timecount = document.getElementById("time");
    var dura_min = Math.floor(player.duration / 60);
    var dura_sec = Math.round(player.duration % 60);
    var curr_min = Math.floor(target_time / 60);
    var curr_sec = Math.round(target_time % 60);
    if(Math.floor(curr_sec / 10) == ""){
      var wrt = curr_min + ':0' + curr_sec + '/' + dura_min + ':' + dura_sec;
    } else {
      var wrt = curr_min + ':' + curr_sec + '/' + dura_min + ':' + dura_sec;
    }
    timecount.innerHTML = wrt;
}


function getMouseCoords(ev) {
    if (ev.pageX || ev.pageY) {
        return {x: ev.pageX, y: ev.pageY};
    }
        return {
        x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
        y: ev.clientY + document.body.scrollTop - document.body.clientTop
    };
}