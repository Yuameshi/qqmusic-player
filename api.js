print("网易云就是废物好吧！");
var api = document.getElementById("iframe");
var player = new QMplayer();

window.onload=function(){
  qmjsonstr("{\"code\":0,\"data\":{\"album\":{\"curnum\":0,\"curpage\":1,\"list\":[],\"totalnum\":0},\"keyword\":\"\",\"mv\":{\"curnum\":0,\"curpage\":1,\"list\":[],\"totalnum\":0},\"priority\":0,\"qc\":[],\"sematic\":{\"curnum\":0,\"curpage\":1,\"list\":[],\"totalnum\":0},\"song\":{\"curnum\":0,\"curpage\":1,\"list\":[{\"albumName_hilight\":\"Limitless（无限）\",\"chinesesinger\":0,\"docid\":\"6204472722485776543\",\"f\":\"254134182|Limitless（无限）|5202149|SeVen.13|10638980|Limitless（无限）|0|238|0|1|0|9529713|3812031|0|0|0|0|5360972|5682914|0|002liAge1MX1l5|003dESR30ILHU7|000ODU4b3jj6cv|0|4009\",\"fiurl\":\"\",\"fnote\":2009,\"fsinger\":\"SeVen.13\",\"fsinger2\":\"\",\"fsong\":\"Limitless（无限）\",\"grp\":[],\"isupload\":0,\"isweiyun\":0,\"lyric\":\"\",\"lyric_hilight\":\"\",\"mv\":\"q00336z1zgn\",\"nt\":428275951,\"only\":1,\"pubTime\":1582042624,\"pure\":0,\"singerMID\":\"003dESR30ILHU7\",\"singerMID2\":\"\",\"singerName2_hilight\":\"\",\"singerName_hilight\":\"SeVen.13\",\"singerid\":5202149,\"singerid2\":0,\"songName_hilight\":\"Limitless（无限）\",\"t\":1,\"tag\":10,\"ver\":0}],\"totalnum\":0},\"totaltime\":0.0,\"zhida\":{\"chinesesinger\":0,\"type\":0}},\"message\":\"no results\",\"notice\":\"\",\"subcode\":10003,\"time\":1590659413,\"tips\":\"\"}");
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
    player.play(ipt);
    print('Duration:' + player.duration);
    if(player.duration == "NaN") {
      print("Error:Cannot Fetch Duration，Maybe Song Not Found!");
      alert('错误：无法获取曲目时长，可能没有该曲目！');
      return;
    }
    var album_element = document.getElementById("album");
    var title_element = document.getElementById("title");
    var songname_element = document.getElementById("songname");
    var songid_element = document.getElementById("songmid");
    var singer_element = document.getElementById("singer");
    var download_element = document.getElementById("download");
    var albumid = player.data.song.album.id;  
    var songname = player.data.song.name;
    songid_element.innerHTML = "曲目ID：" + ipt;
    songid_element.href = "https://y.qq.com/n/yqq/song/" + ipt+".html";
    msprev(songname, "未知艺术家", player.data.song.album.name, "http://imgcache.qq.com/music/photo/album_300/20/300_albumpic_" + albumid + "_0.jpg");
    songname_element.innerHTML = songname;
    title_element.innerHTML = songname + ' · QQ音乐播放器';
  	singer_element.innerHTML = "未知艺术家";
    album_element.src = "http://imgcache.qq.com/music/photo/album_300/20/300_albumpic_" + albumid + "_0.jpg";
    fetchprogress();
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
    var method = window.confirm("请选择希望的播放方式：\n是：将跳转到QQ音乐搜索API\n否：将弹出QQ音乐搜索界面\n\n注意：部分浏览器肯可能会拦截弹出窗口，届时请允许此页面弹出窗口！");
    if (method == true) {
      var newwindow = 'https://c.y.qq.com/soso/fcgi-bin/music_search_new_platform?searchid=53806572956004615&t=1&aggr=1&cr=1&catZhida=1&lossless=0&format=json&flag_qc=0&p=1&n=1&w=' + ipt;
      alert('即将打开一个新窗口，请尽量在10秒内选中新窗口内所有字符拷贝并切换焦点到原窗口，粘贴至稍后的输入框内，若不正确输入则可能出现无法正确播放，歌曲信息无法正确显示等错误！\n快捷键：Control+A=>Control+C=>Alt+F4');
      window.open(newwindow,'newwindow','height=700,width=600,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, status=no')
      setTimeout(function(){var getted_json = prompt("请在此输入你接受到的JSON字符串：\n\n看不到窗口？尝试查看后台是否有该窗口！","");qmjsonstr(getted_json);},10000);
    }
    if (method == false) {
      var newwindow = 'https://y.qq.com/portal/search.html#page=1&searchid=1&remoteplace=txt.yqq.top&t=song&w=' + ipt;
      alert('即将打开一个新窗口，请在新窗口内选中希望播放的歌曲并使用曲目ID播放！\n如：\nURL为“https://y.qq.com/n/yqq/song/000WKvUf0GuCyl.html”\n则取“000WKvUf0GuCy”');
      window.open(newwindow,'newwindow','height=700,width=600,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, status=no');
    }
}


//谁搞出了跨域可以用这里的函数
function qmjsonraw(res) {
  if (!res) {
    res = { "code": 0, "data": { "album": { "curnum": 0, "curpage": 1, "list": [], "totalnum": 0 }, "keyword": "", "mv": { "curnum": 0, "curpage": 1, "list": [], "totalnum": 0 }, "priority": 0, "qc": [], "sematic": { "curnum": 0, "curpage": 1, "list": [], "totalnum": 0 }, "song": { "curnum": 0, "curpage": 1, "list": [{ "albumName_hilight": "王者荣耀 游戏原声 时之恋人", "albumTransName": "Time Reflection /  /  / ", "albumTransName_hilight": "<span class=\"c_tx_highlight\">Time Reflection</span> /  /  / ", "chinesesinger": 0, "docid": "4090721507775583551", "f": "265138219|Time Reflection|1339126|王者荣耀;Jennifer Sumire|12424333|王者荣耀 游戏原声 时之恋人|0|268|0|1|5|10759217|4303945|0|0|0|30153146|5958804|6486615|0|004RKijy0HaQqd|002KASw53FQbTK|002nRQNR178Nzf|31|0", "fiurl": "", "fnote": 0, "fsinger": "王者荣耀", "fsinger2": "Jennifer Sumire", "fsong": "Time Reflection", "grp": [], "isupload": 0, "isweiyun": 0, "lyric": "", "lyric_hilight": "", "mv": "", "nt": 1263440265, "only": 0, "pubTime": 1589904012, "pure": 0, "singerMID": "002KASw53FQbTK", "singerMID2": "0022ChW82n1fcK", "singerName2_hilight": "Jennifer Sumire", "singerName_hilight": "王者荣耀", "singerid": 1339126, "singerid2": 2903796, "songName_hilight": "<span class=\"c_tx_highlight\">Time Reflection</span>", "t": 1, "tag": 10, "ver": 0 }, { "albumName_hilight": "王者荣耀 游戏原声 时之恋人", "albumTransName": "Time Reflection /  /  / ", "albumTransName_hilight": "<span class=\"c_tx_highlight\">Time Reflection</span> /  /  / ", "chinesesinger": 0, "docid": "12539038946254143869", "f": "265548078|Time Reflection|1339126|王者荣耀|12424333|王者荣耀 游戏原声 时之恋人|0|268|0|1|5|10759556|4303967|0|0|0|27486620|6208226|6485632|0|001f1OS63cRWl2|002KASw53FQbTK|002nRQNR178Nzf|31|0", "fiurl": "", "fnote": 0, "fsinger": "王者荣耀", "fsinger2": "", "fsong": "Time Reflection (伴奏)", "grp": [], "isupload": 0, "isweiyun": 0, "lyric": "", "lyric_hilight": "", "mv": "", "nt": 873189400, "only": 1, "pubTime": 1590041768, "pure": 0, "singerMID": "002KASw53FQbTK", "singerMID2": "", "singerName2_hilight": "", "singerName_hilight": "王者荣耀", "singerid": 1339126, "singerid2": 0, "songName_hilight": "<span class=\"c_tx_highlight\">Time Reflection</span> (伴奏)", "t": 1, "tag": 10, "ver": 0 }], "totalnum": 0 }, "totaltime": 0.0, "zhida": { "chinesesinger": 0, "type": 0, "zhida_album": {} } }, "message": "no results", "notice": "", "subcode": 10003, "time": 1590381656, "tips": "" }
  }
  print("JSON Data Parsing...")
  var songmid = res.data.song.list["0"].media_mid;
  var album = res.data.song.list["0"].albumname;
  var albumid = res.data.song.list["0"].albumid;
  var songname = res.data.song.list["0"].songname;
  var singer1 = res.data.song.list["0"].singerName_hilight;
  var singer2 = res.data.song.list["0"].singerName2_hilight;
  if (singer2 != undefined) {
    var singer = singer1 + ';' + singer2;
  }
  print("Parsed SongMID : " + songmid);
  print("Parsed Singer : " + singer);
  print("Parsed album ID : " + albumid);
  var album_element = document.getElementById("album");
  var title_element = document.getElementById("title");
  var songname_element = document.getElementById("songname");
  var songid_element = document.getElementById("songmid");
  var singer_element = document.getElementById("singer");
  songname_element.innerHTML = songname;
  singer_element.innerHTML = singer;
  songid_element.innerHTML = '曲目ID：' + songmid;
  songid_element.href = "https://y.qq.com/n/yqq/song/" + songmid + ".html";
  title_element.innerHTML = songname + ' · QQ音乐播放器';
  album_element.src = 'http://imgcache.qq.com/music/photo/album_300/20/300_albumpic_' + res.data.song.list["0"].albumid + '_0.jpg';
  player.play(songmid);
  album_element.innerHTML = album;
  msprev(songname, singer, album, "http://imgcache.qq.com/music/photo/album_300/20/300_albumpic_" + albumid + "_0.jpg");
}


function qmjsonstr(res) {
  if (!res) {
    var res = prompt("请输入JSON数据","");
  }
  var temp;
  var songname = res.slice(res.indexOf("fsong") + 8, res.indexOf("grp") - 3);
  print("Parsed Song Name: " + songname);
  var coredata = res.slice(res.indexOf("\"f\""), res.indexOf("\"fiurl\""));
  console.log("Prised Core Data: " + coredata);
  temp = songname.length + 15 + 9;
  var singer = coredata.slice(temp, coredata.indexOf("|", temp + 1));
  print("Parsed Singer: " + singer);
  temp = temp + singer.length + 10;
  var album = coredata.slice(temp, coredata.indexOf("|", temp + 1));
  print("Parsed album Name: " + album);
  var songmid = coredata.slice(coredata.indexOf("|00") + 1, coredata.indexOf("|00") + 15);
  print("Prised SongMid: " + songmid);
  temp = 15 + songname.length + 9 + singer.length + 1;
  var albumid = coredata.slice(temp, coredata.indexOf("|", temp));
  print("Prised Album ID: " + albumid)

  player.play(songmid);
  var album_element = document.getElementById("album");
  var title_element = document.getElementById("title");
  var songname_element = document.getElementById("songname");
  var songid_element = document.getElementById("songmid");
  var singer_element = document.getElementById("singer");
  songname_element.innerHTML = songname;
  singer_element.innerHTML = singer;
  songid_element.innerHTML = '曲目ID：' + songmid;
  songid_element.href = "https://y.qq.com/n/yqq/song/" + songmid +".html";
  title_element.innerHTML = songname + ' · QQ音乐播放器';
  album_element.src = 'http://imgcache.qq.com/music/photo/album_300/20/300_albumpic_' + albumid + '_0.jpg';
  album_element.innerHTML = album;
  msprev(songname, singer, album, "http://imgcache.qq.com/music/photo/album_300/20/300_albumpic_" + albumid + "_0.jpg");
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