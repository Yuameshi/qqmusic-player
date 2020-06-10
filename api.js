print("网易云就是废物好吧！");
var player = new QMplayer();

window.onload=function(){
  callback({"code":0,"data":{"album":{"curnum":0,"curpage":1,"list":[],"totalnum":0},"keyword":"","mv":{"curnum":0,"curpage":1,"list":[],"totalnum":0},"priority":0,"qc":[],"sematic":{"curnum":0,"curpage":1,"list":[],"totalnum":0},"song":{"curnum":0,"curpage":1,"list":[{"albumName_hilight":"Limitless（无限）","chinesesinger":0,"docid":"6204472722485776543","f":"254134182|Limitless（无限）|5202149|SeVen.13|10638980|Limitless（无限）|0|238|0|1|0|9529713|3812031|0|0|0|0|5360972|5682914|0|002liAge1MX1l5|003dESR30ILHU7|000ODU4b3jj6cv|0|4009","fiurl":"","fnote":2009,"fsinger":"SeVen.13","fsinger2":"","fsong":"Limitless（无限）","grp":[],"isupload":0,"isweiyun":0,"lyric":"","lyric_hilight":"","mv":"q00336z1zgn","nt":428275951,"only":1,"pubTime":1582042624,"pure":0,"singerMID":"003dESR30ILHU7","singerMID2":"","singerName2_hilight":"","singerName_hilight":"SeVen.13","singerid":5202149,"singerid2":0,"songName_hilight":"Limitless（无限）","t":1,"tag":10,"ver":0}],"totalnum":0},"totaltime":0.0,"zhida":{"chinesesinger":0,"type":0}},"message":"no results","notice":"","subcode":10003,"time":1591690814,"tips":""})
  player.play();
  print("Initial Song Loaded！")
  print("Player State:" + player.state);
  print("Started Auto Fetching Progress/Player State...");
  var stat = player.state;
  var album = document.getElementById("album");
  album.className = "empty";
  setInterval(function () {
    autofetchprogress();
    stat = player.state;
    if (stat == "playing") {
      playpause.innerHTML = "||";
      album.className = "albumrotating"
    } else {
      playpause.innerHTML = "►";
      album.className = "empty";
    }
  },1000);
}

function msprev(songname,singer,album,image) {
  if(!album){
    album = songname;
  }
  if ('mediaSession' in navigator){
    navigator.mediaSession.metadata = new MediaMetadata({
      title: songname,
      artist: singer,
      album: album,
      artwork: [{src: image, sizes: "300x300", type: "image/jpeg"}]
    });
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
      alert('曲目ID不能为空！');
      return;
    }
    print("Input Box Value：" + ipt);
    var Temp = player.data.song.mid;
    player.play(ipt);
    print('Duration:' + player.duration);
    setTimeout(function(){
    if(isNaN(player.duration)) {
      print("Error:Cannot Fetch Duration，Maybe Song Not Found!");
      alert('错误：无法获取曲目时长，可能没有该曲目！');
      player.play(Temp)
      return;
    }},100);
    print("Getting Player Data...");
    var album_element = document.getElementById("album");
    var title_element = document.getElementById("title");
    var songname_element = document.getElementById("songname");
    var songid_element = document.getElementById("songmid");
    var singer_element = document.getElementById("singer");
    var download_element = document.getElementById("download");
    var songname = player.data.song.name;
    print("Getted Song Name:"+songname);
    var albumid = player.data.song.album.id; 
    print("Getted Aubum ID:"+albumid); 
    songid_element.innerHTML = "曲目ID：" + ipt;
    songid_element.href = "https://y.qq.com/n/yqq/song/" + ipt+".html";
    msprev(songname, player.data.song.singer[0].name, player.data.song.album.name, "http://imgcache.qq.com/music/photo/album_300/20/300_albumpic_" + albumid + "_0.jpg");
    songname_element.innerHTML = songname;
    title_element.innerHTML = songname + ' · QQ音乐播放器';
  	singer_element.innerHTML = player.data.song.singer[0].name;
    album_element.src = "http://imgcache.qq.com/music/photo/album_300/20/300_albumpic_" + albumid + "_0.jpg";
    download_element.href = player.data.song.url;
}


//通过歌名
function throughname() {
	  print("Start Running Process：throughname()");
	  var iptbox = document.getElementById("iptbox");
    var album = 'http://imgcache.qq.com/music/photo/album_200/20/200_albumpic_140820_0.jpg'
    var ipt = iptbox.value;
    print("Input Box Value：" + ipt);
    iptbox.value = "";
    if (!ipt) {
      print('Error：Empty String！');
      alert('曲目名不能为空！');
      return;
    }
    var script=document.createElement("script")
    script.src="proxy.php?w=" + ipt;
    document.body.appendChild(script);
    setTimeout("document.body.removeChild(script)",10000)
}

function callback(res) {
  if (!res) {
    print("Error:Cannot Get Callback Data!");
    return;
  }
  print("JSON Data Parsing...");
  var coredata=res.data.song.list["0"].f;
  print("Parsed Core Data:"+coredata);
  var songmid = coredata.slice(coredata.indexOf("|00")+1,coredata.indexOf("|00")+15);
  print("Parsed Song ID:"+songmid);
  player.play(songmid);
  print("Trying To Start To Play");
  setTimeout(function () {
  print("Getting Player Data=>Song Name...");
  var songname = player.data.song.name;
  print("Getted Song Data=>Song Name:" + songname);
  print("Getting Player Data=>Singer");
  var singer = player.data.song.singer["0"].name;
  print("Getted Song Data=>Singer:" + singer);
  print("Getting Player Data=>Aubum ID...");
  var albumid = player.data.song.album.id;
  print("Getted Song Data=>Aubum ID:" + albumid);
  print("Getting Player Data=>Album Name...");
  var album = player.data.song.album.name;
  print("Getted Song Data=>Album Name:" + album);
  var album_element = document.getElementById("album");
  var title_element = document.getElementById("title");
  var songname_element = document.getElementById("songname");
  var songid_element = document.getElementById("songmid");
  var singer_element = document.getElementById("singer");
  var download_element = document.getElementById("download");
  songname_element.innerHTML = songname;
  singer_element.innerHTML = singer;
  songid_element.innerHTML = '曲目ID：' + songmid;
  songid_element.href = "https://y.qq.com/n/yqq/song/" + songmid + ".html";
  title_element.innerHTML = songname + ' · QQ音乐播放器';
  album_element.src = 'http://imgcache.qq.com/music/photo/album_300/20/300_albumpic_' + albumid + '_0.jpg';
  album_element.alt = album;
  msprev(songname, singer, album, "http://imgcache.qq.com/music/photo/album_300/20/300_albumpic_" + albumid + "_0.jpg");
  download_element.href = player.data.song.url;
  },500)
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