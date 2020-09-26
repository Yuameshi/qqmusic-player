/*
按照许可条款，您(以下均指使用此仓库的人)可以自由的分发此仓库源代码，但根据CC：BY-NC-ND4.0，您不应将其用于商业用途，并且，您可能无法将继续分发已经进行过修改的副本，除非经过此仓库原作者承认，根据Apache License 2.0，我们保留对您进行起诉的权利。


请注意：当您对源代码进行修改时，请注意好处理依赖关系。
  **特别注意：此源代码全部依赖于QQ音乐官方API，若您将此JavaScript引用至其他页面，请添加<script src="https://y.gtimg.cn/music/h5/player/player.js?max_age=2592000"></script>
*/
print("网易云就是废物好吧！");
var player = new QMplayer();
player.play("002liAge1MX1l5");

window.onload = function () {
  callback({ "code": 0, "data": { "album": { "curnum": 0, "curpage": 1, "list": [], "totalnum": 0 }, "keyword": "", "mv": { "curnum": 0, "curpage": 1, "list": [], "totalnum": 0 }, "priority": 0, "qc": [], "sematic": { "curnum": 0, "curpage": 1, "list": [], "totalnum": 0 }, "song": { "curnum": 0, "curpage": 1, "list": [{ "albumName_hilight": "Limitless（无限）", "chinesesinger": 0, "docid": "6204472722485776543", "f": "254134182|Limitless（无限）|5202149|SeVen.13|10638980|Limitless（无限）|0|238|0|1|0|9529713|3812031|0|0|0|0|5360972|5682914|0|002liAge1MX1l5|003dESR30ILHU7|000ODU4b3jj6cv|0|4009", "fiurl": "", "fnote": 2009, "fsinger": "SeVen.13", "fsinger2": "", "fsong": "Limitless（无限）", "grp": [], "isupload": 0, "isweiyun": 0, "lyric": "", "lyric_hilight": "", "mv": "q00336z1zgn", "nt": 428275951, "only": 1, "pubTime": 1582042624, "pure": 0, "singerMID": "003dESR30ILHU7", "singerMID2": "", "singerName2_hilight": "", "singerName_hilight": "SeVen.13", "singerid": 5202149, "singerid2": 0, "songName_hilight": "Limitless（无限）", "t": 1, "tag": 10, "ver": 0 }], "totalnum": 0 }, "totaltime": 0.0, "zhida": { "chinesesinger": 0, "type": 0 } }, "message": "no results", "notice": "", "subcode": 10003, "time": 1591690814, "tips": "" })
  player.play();
  print("Initial Song Loaded！")
  print("Player State:" + player.state);
  print("Started Auto Fetching Progress...");
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
  }, 1000);
}

function msprev(songname, singer, album, image) {
  if (!album) {
    album = songname;
  }
  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: songname,
      artist: singer,
      album: album,
      artwork: [{ src: image, sizes: "300x300", type: "image/jpeg" }]
    });
  }
}

function apply2page(songmid) {
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
  msprev(songname, singer, album, "http://imgcache.qq.com/music/photo/album_300/20/300_albumpic_" + albumid + "_0.jpg");
  var title_element = document.getElementById("title");
  var songname_element = document.getElementById("songname");
  var singer_element = document.getElementById("singer");
  var album_element = document.getElementById("album");
  var songid_element = document.getElementById("songmid");
  var download_element = document.getElementById("download");
  title_element.innerHTML = songname + " · QQ音乐播放器";
  songname_element.innerHTML = songname;
  singer_element.innerHTML = singer;
  album_element.alt = album;
  album_element.src = "http://imgcache.qq.com/music/photo/album_300/20/300_albumpic_" + albumid + "_0.jpg";
  songid_element.innerHTML = "曲目ID:" + songmid;
  songid_element.href = "https://y.qq.com/n/yqq/song/" + songmid + ".html"
  download_element.href = player.data.song.url;
  download_element.download = songname + "-" + singer + "-Powered By QQMusic API";
}

function print(text) {
  console.log("%c QQ Music Player API: %c" + text, "border-top-left-radius:5px;border-bottom-left-radius: 5px;margin:0;padding:0;font-size:14px;font-family:'Helvetica','Arial Unicode MS';background-color:rgb(20,188,114);color:rgb(255,220,0);", "font-size:14px;font-family:'Helvetica','Arial Unicode MS';background-color:rgb(255,220,0);color:rgb(17,190,115);margin:5px;margin-left:0;border-top-right-radius:5px;border-bottom-right-radius:5px;");
}

function throughid(ipt) {
  if (!ipt) {
    print('Error：Empty String！');
    alert('曲目ID不能为空！');
    return;
  }
  print("Input：" + ipt);
  var Temp = player.data.song.mid;
  player.play(ipt);
  setTimeout(function () {
    if (isNaN(player.duration)) {
      print("Error:Cannot Fetch Duration，Maybe Song Not Found!");
      //alert('错误：无法获取曲目时长，可能没有该曲目！');
      player.play(Temp);
      return;
    }
    if (player.data.song.pay.pay_play == 1) {
      print("Error：Value Of Pay2Play Is TRUE!");
      //alert("错误：歌曲为付费播放歌曲！\n详细信息：\n曲目名："+player.data.song.name+"\n演唱者："+player.data.song.singer["0"].name+"\n专辑："+player.data.song.album.name);
      player.play(Temp);
      return;
    }
    if (player.data.song.url == "") {
      print("Unexpected Error: Cannot Get Song URL!");
      //alert("意料之外的错误：无法找到播放地址！可能QQ音乐没有该音乐的版权！\n详细信息：\n曲目名："+player.data.song.name+"\n演唱者："+player.data.song.singer["0"].name+"\n专辑："+player.data.song.album.name);
      player.play(Temp);
      return;
    }
    apply2page(ipt);
  }, 500);
}

function throughname(ipt) {
  if (!ipt) {
    print("Info: No Initial Value! Getting Data From Input Box...");
    var iptbox = document.getElementById("iptbox");
    var ipt = iptbox.value;
    print("Input Box Value：" + ipt);
    iptbox.value = "";
  }
  if (!ipt) {
    print('Error：Empty String！');
    alert('曲目名不能为空！');
    return;
  }
  var script = document.createElement("script");
  script.src = "http://c.y.qq.com/soso/fcgi-bin/music_search_new_platform?searchid=53806572956004615&t=1&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=1&n=1&w=" + ipt;
  document.body.appendChild(script);
  setTimeout(function () { document.body.removeChild(script) }, 5000);
}

function callback(res) {
  if (!res) {
    alert("错误：无法收到返回值！")
    print("Error:Cannot Get Callback Data!");
    return;
  }
  if (res.data.song.list.length == 0 || res.subcode == -10002) {
    alert("错误：无法找到曲目！");
    print("Error:Song Cannot Be Found!");
    return;
  }
  print("JSON Data Parsing...");
  var coredata = res.data.song.list["0"].f;
  print("Parsed Core Data:" + coredata);
  var songmid = coredata.slice(coredata.indexOf("|00") + 1, coredata.indexOf("|00") + 15);
  print("Parsed Song ID:" + songmid);
  var Temp = player.data.song.mid;
  var TempDura = player.duration;
  player.play(songmid);
  print("Trying To Start To Play");
  setTimeout(function () {
    if (player.data.song.pay.pay_play == 1) {
      print("Error：Value Of Pay2Play Is TRUE!");
      alert("错误：歌曲为付费播放歌曲！\n详细信息：\n曲目名：" + player.data.song.name + "\n演唱者：" + player.data.song.singer["0"].name + "\n专辑：" + player.data.song.album.name);
      player.play(Temp);
      return;
    }
    if (player.data.song.url == "") {
      print("Unexpected Error: Cannot Get Song URL!");
      alert("意料之外的错误：歌曲无法找到播放地址！可能QQ音乐没有该音乐的版权！\n详细信息：\n曲目名：" + player.data.song.name + "\n演唱者：" + player.data.song.singer["0"].name + "\n专辑：" + player.data.song.album.name);
      player.play(Temp);
      return;
    }
    apply2page(songmid);
  }, 500);
}

function playorpause() {
  print("Try To Change Status Of Player");
  player.play();
  var playpause = document.getElementById("playpause");
  var state = player.state;
  print("Status：" + state);
  if (state == "playing") {
    playpause.innerHTML = "||";
  } else {
    playpause.innerHTML = "►";
  }

}

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
  if (Math.floor(wrtcurr_sec / 10) == "") {
    wrtcurr_sec = "0" + wrtcurr_sec;
  }
  if (Math.floor(wrtdura_sec / 10) == "") {
    wrtdura_sec = "0" + wrtdura_sec;
  }
  var wrt = wrtcurr_min + ':' + wrtcurr_sec + '/' + wrtdura_min + ':' + wrtdura_sec;
  timecount.innerHTML = wrt;
  progress.style.width = wid * 100 + "%";
}

function changeprogress(ev) {
  var progress = document.getElementById("progressbar");
  var progressinner = document.getElementById("progressinner");
  var MousePosX = ev.offsetX;
  print("Mouse Position=>X:" + MousePosX);
  print("Progress Bar=>Width:" + progress.offsetWidth);
  var inner_width = MousePosX / progress.offsetWidth;
  print("Progress=>Inner=>Width Will Be Changed:" + progressinner.offsetWidth / progress.offsetWidth + "%=>" + inner_width * 100 + "%");
  progressinner.style.width = inner_width * 100 + "%";
  var target_time = player.duration * inner_width;
  print("Time Will Be Changed:" + player.currentTime + "=>" + target_time);
  player.currentTime = target_time;
  var timecount = document.getElementById("time");
  var dura_min = Math.floor(player.duration / 60);
  var dura_sec = Math.round(player.duration % 60);
  var curr_min = Math.floor(target_time / 60);
  var curr_sec = Math.round(target_time % 60);
  if (Math.floor(wrtcurr_sec / 10) == "") {
    wrtcurr_sec = "0" + wrtcurr_sec;
  }
  if (Math.floor(wrtdura_sec / 10) == "") {
    wrtdura_sec = "0" + wrtdura_sec;
  }
  var wrt = curr_min + ':' + curr_sec + '/' + dura_min + ':' + dura_sec;
  timecount.innerHTML = wrt;
}