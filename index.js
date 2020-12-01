/*
按照许可条款，您(以下均指使用此仓库的人)可以自由的分发此仓库源代码，但根据CC：BY-NC-SA4.0，您不应将其用于商业用途，并且，您需要以相同方式将继续分发修改过的副本，除非您仅限于私人用途。


请注意：当您对源代码进行修改时，请注意好处理依赖关系。
  **特别注意：此源代码大部分依赖于QQ音乐官方API，若您将此JavaScript引用至其他页面，请在页面内添加<script src="https://y.gtimg.cn/music/h5/player/player.js?max_age=2592000"></script>
*/

print("网易云就是废物好吧！");
var player;

window.onload = function () {
	player = new QMplayer();
	document.querySelector("#search-btn").addEventListener("click", playByName);
	document.querySelector("#playPause").addEventListener("click", playPause);
	document
		.querySelector("#fetchProgress")
		.addEventListener("click", autoFetchProgress);
	document
		.querySelector("#progressBar")
		.addEventListener("click", changeProgress);
	document
		.querySelector("#progressBarInner")
		.addEventListener("click", changeProgress);
	playByName("Limitless");
	player.play();
	print("Initial Song Loaded！");
	print("Player State:" + player.state);
	print("Started Auto Fetching Progress...");
	var stat = player.state;
	var album = document.getElementById("album");
	album.className = "empty";
	var playpause = document.getElementById("playPause");
	setInterval(function () {
		autoFetchProgress();
		stat = player.state;
		if (stat == "playing") {
			playpause.innerHTML = "||";
			album.className = "albumrotating";
		} else {
			playpause.innerHTML = "►";
			album.className = "empty";
		}
	}, 1000);
};

function mediaSessionSync(songname, singer, album, image) {
	if (!album) {
		album = songname;
	}
	if ("mediaSession" in navigator) {
		navigator.mediaSession.metadata = new MediaMetadata({
			title: songname,
			artist: singer,
			album: album,
			artwork: [{ src: image, sizes: "300x300", type: "image/jpeg" }],
		});
	}
}

function pageDataSync() {
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
	mediaSessionSync(
		songname,
		singer,
		album,
		"http://imgcache.qq.com/music/photo/album_300/20/300_albumpic_" +
			albumid +
			"_0.jpg"
	);
	var title_element = document.getElementById("title");
	var songname_element = document.getElementById("songName");
	var singer_element = document.getElementById("singer");
	var album_element = document.getElementById("album");
	var songid_element = document.getElementById("songMID");
	var download_element = document.getElementById("download");
	title_element.innerHTML = songname + " · QQ音乐播放器";
	songname_element.innerHTML = songname;
	singer_element.innerHTML = singer;
	album_element.alt = album;
	album_element.src =
		"http://imgcache.qq.com/music/photo/album_300/20/300_albumpic_" +
		albumid +
		"_0.jpg";
	songid_element.innerHTML = "曲目ID:" + player.data.song.mid;
	songid_element.href =
		"https://y.qq.com/n/yqq/song/" + player.data.song.mid + ".html";
	download_element.href = player.data.song.url;
	download_element.download =
		songname + "-" + singer + "-Powered By QQMusic API";
}

function print(text) {
	console.log(
		"%c QQ Music Player API %c" + text,
		"margin:0;padding:0;font-size:14px;font-family:'Helvetica','Arial Unicode MS';background-color:rgb(20,188,114);color:rgb(255,220,0);",
		"font-size:14px;font-family:'Helvetica','Arial Unicode MS';background-color:rgb(255,220,0);color:rgb(17,190,115);margin:5px;margin-left:0;"
	);
}

function playByID(ipt) {
	if (!ipt || ipt.toString() == "[object MouseEvent]") {
		print("Error：Empty String！");
		alert("曲目ID不能为空！");
		return;
	}
	print("Input：" + ipt);
	if (player.data.song) {
		var Temp = player.data.song.mid;
	}
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
		pageDataSync();
	}, 500);
}

function playByName(ipt) {
	if (!ipt || ipt.toString() == "[object MouseEvent]") {
		print("Info: No Initial Value! Getting Data From Input Box...");
		var iptbox = document.getElementById("iptbox");
		var ipt = iptbox.value;
		print("Input Box Value：" + ipt);
		iptbox.value = "";
	}
	if (!ipt) {
		print("Error：Empty String！");
		alert("曲目名不能为空！");
		return;
	}
	var script = document.createElement("script");
	script.src =
		"https://c.y.qq.com/soso/fcgi-bin/client_search_cp?ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.center&searchid=37239836122015992&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=1&n=1&g_tk_new_20200303=5381&g_tk=5381&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&w=" +
		ipt;
	document.body.appendChild(script);
	print("Calling up function through CORS JSONP...");
	setTimeout(function () {
		document.body.removeChild(script);
	}, 5000);
}

function callback(res) {
	if (!res) {
		alert("错误：无法收到返回值！");
		print("Error:Cannot Get Callback Data!");
		return;
	}
	if (res.data.song.list.length == 0 || res.subcode == -10002) {
		alert("错误：无法找到曲目！");
		print("Error:Song Cannot Be Found!");
		return;
	}
	print("JSON Data Parsing...");
	var songmid = res.data.song.list[0].mid;
	print("Parsed Song ID:" + songmid);
	if (player.data.song) var Temp = player.data.song.mid;
	player.play(songmid);
	print("Trying To Start To Play");
	setTimeout(function () {
		if (player.data.song.pay.pay_play == 1) {
			print("Error：Value Of Pay2Play Is TRUE!");
			alert(
				"错误：歌曲为付费播放歌曲！\n详细信息：\n曲目名：" +
					player.data.song.name +
					"\n演唱者：" +
					player.data.song.singer["0"].name +
					"\n专辑：" +
					player.data.song.album.name
			);
			player.play(Temp);
			return;
		}
		if (player.data.song.url == "") {
			print("Unexpected Error: Cannot Get Song URL!");
			alert(
				"意料之外的错误：歌曲无法找到播放地址！可能QQ音乐没有该音乐的版权！\n详细信息：\n曲目名：" +
					player.data.song.name +
					"\n演唱者：" +
					player.data.song.singer["0"].name +
					"\n专辑：" +
					player.data.song.album.name
			);
			player.play(Temp);
			return;
		}
		pageDataSync();
	}, 500);
}

function playPause() {
	print("Try To Change Status Of Player");
	player.play();
	var playpause = document.getElementById("playPause");
	var state = player.state;
	print("Status：" + state);
	if (state == "playing") {
		playpause.innerHTML = "||";
	} else {
		playpause.innerHTML = "►";
	}
}

function autoFetchProgress() {
	var progress = document.getElementById("progressBarInner");
	var timecount = document.getElementById("time");
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
	var wrt =
		wrtcurr_min + ":" + wrtcurr_sec + "/" + wrtdura_min + ":" + wrtdura_sec;
	timecount.innerHTML = wrt;
	progress.style.width = wid * 100 + "%";
}

function changeProgress(ev) {
	var progress = document.getElementById("progressBar");
	var progressinner = document.getElementById("progressBarInner");
	var MousePosX = ev.offsetX;
	print("Mouse Position=>X:" + MousePosX);
	print("Progress Bar=>Width:" + progress.offsetWidth);
	var inner_width = MousePosX / progress.offsetWidth;
	print(
		"Progress=>Inner=>Width Will Be Changed:" +
			progressinner.offsetWidth / progress.offsetWidth +
			"%=>" +
			inner_width * 100 +
			"%"
	);
	progressinner.style.width = inner_width * 100 + "%";
	var target_time = player.duration * inner_width;
	print("Time Will Be Changed:" + player.currentTime + "=>" + target_time);
	player.currentTime = target_time;
	autoFetchProgress();
}
