var songs = ['Rap God', 'Till I Collapse', 'Beautiful', 'My Name Is', 'Without Me', 'Not Alike', 'I Need A Doctor', 'When I\'m Gone', 'Fall', 'Cleaning Out My Closet', 'Love The Way You Lie', 'Lose Yourself', 'Not Afraid', 'The Real Slim Shady', 'Ass Like That', 'The Monster', 'Space Bound', 'Killshot', 'Kamikaze', 'Lucky You', 'Mockingbird', 'Smack That', 'Venom', 'River', 'Forever'];
var titles = new Array();
var seek_startX = 121;
var Thumbnails = new Array();
var playedTime = 0;

//creating an arary for titles of songs
for (var i = 0; i < songs.length; i++) {
    titles.push(songs[i]);
}
for (var i = 1; i < 7; i++) {
    Thumbnails.push('thumbnails/t' + (i).toString() + '.jpg');
}
//reveal menu in mobile view
function revealMenu() {
    for (var i = 0; i < 3; ++i) {
        document.getElementsByTagName('a')[i].style.display = 'block';
    }
}
//close function
function closeThis(elem) {
    document.getElementById(elem).style.display = 'none';
}

function loading() {
    setTimeout(function() {
        document.querySelector('#cover').style.display = 'none';
    }, 4000);
}
loading();
var currentSong = 0;
var seekBar = document.getElementsByClassName('slide');

var durations = new Array(songs.length);
var played_time = document.querySelector('#played_time');
//main play button
var control_play = document.querySelector('#play');
var full_control_play = document.querySelector('#fc-play');
var controlPanel = document.querySelector('#control-panel');
var fullControlPanel = document.querySelector('#fullPageControls');
var closeButton = document.querySelector('#close');
var thumbnail_song = document.querySelector('#thumbnail');
//inititializing songs
for (var i = 0; i < songs.length; i++) {
    songs[i] = new Audio('songs/' + songs[i] + '.mp3');
    songs[i].ontimeupdate = updateSeekBar;
    songs[i].className = 'song';
    songs[i].accessKey = i;
}


var songs_container = document.querySelector('#itemsList');

function addTitle(i) {
    var song_title = document.createTextNode((i + 1).toString() + '. ' + titles[i]);
    var song = document.createElement('div');
    song.appendChild(song_title);
    song.className = 'songPanel';
    song.accessKey = i;
    songs_container.appendChild(song);
}
for (var l = 0; l < songs.length; l++) {
    setTimeout(addTitle, 1000, l); //updating durations
}

var loop = false;
var seek_bar_container = document.querySelector('#seek-bar-container');
var bools = {
    'true': false,
    'false': true
};
//changeView
function changeView() {
    controlPanel.style.display = 'none';
    fullControlPanel.style.display = 'block';
}
//close view
function closeView() {
    fullControlPanel.style.display = 'none';
    controlPanel.style.display = 'block';
}
//loop a song
function loopSong() {
    loop = bools[loop];

    if (loop) {

        document.querySelectorAll('.glyphicon.glyphicon-retweet')[0].style.color = 'darkgreen';
        document.querySelectorAll('.glyphicon.glyphicon-retweet')[1].style.color = 'darkgreen';
    } else {

        document.querySelectorAll('.glyphicon.glyphicon-retweet')[0].style.color = 'white';
        document.querySelectorAll('.glyphicon.glyphicon-retweet')[1].style.color = 'white';
    }
}
//clicks on song names
document.addEventListener('click', function(event) {
    if (event.target.matches('.songPanel')) {
        playOrPause(event.target.accessKey);
    } else if (event.target.matches('#songTitle')) {
        changeView();
    } else if (event.target.matches('#close')) {
        closeView();

    } else if (event.target.matches(".glyphicon-repeat")) {
        reset();
    } else if (event.target.matches(".glyphicon-retweet")) {
        loopSong();
    }
});


var span_loop = document.createElement('span');
var span_reset = document.createElement('span');
span_reset.className = 'glyphicon glyphicon-repeat';
span_reset.style = 'float:right;padding:4px;cursor:pointer;font-size:16px;';
span_loop.className = 'glyphicon glyphicon-retweet';
span_loop.style = 'float:right;padding:4px;cursor:pointer;font-size:14px;';
var current_playing_title = document.getElementById('songTitle');
var full_title = document.getElementById('full-title');
var current_playing_duration = 0.0;

function playOrPause(id) {

    if (!songs[id].paused) {
        songs[id].pause();
        control_play.className = 'fas fa-play';
        full_control_play.className = 'glyphicon glyphicon-play';
    } else if (songs[id].paused) {
        songs.forEach(function(song, index) {
            song.pause();
            control_play.className = 'fas fa-play';
            full_control_play.className = 'glyphicon glyphicon-play';
        })
        current_playing_title.innerText = titles[id];
        full_title.innerText = titles[id];
        current_playing_title.appendChild(span_reset);
        current_playing_title.appendChild(span_loop);
        songs[id].play();
        control_play.className = 'fas fa-pause';
        playedTime = 0;
        full_control_play.className = 'glyphicon glyphicon-pause';
    } else {
        //pass
    }
    updateSong();





}

function updateSong() {
    for (var i = 0; i < songs.length; i++) {
        if (!songs[i].paused) {
            currentSong = i;
            break
        }

    }
}

function playing_current() {
    if (!songs[currentSong].paused) {
        songs[currentSong].pause();
        control_play.className = 'fas fa-play';
        full_control_play.className = 'glyphicon glyphicon-play';
    } else if (songs[currentSong].paused) {
        songs[currentSong].play();
        control_play.className = 'fas fa-pause';
        full_control_play.className = 'glyphicon glyphicon-pause';
    }
    current_playing_title.innerText = titles[currentSong];
    thumbnail_song.src = Thumbnails[Math.floor((Math.random() * 5) + 1)];

    full_title.innerText = titles[currentSong];
    current_playing_title.appendChild(span_reset);
    current_playing_title.appendChild(span_loop);
}

function next() {

    songs[currentSong].pause();
    if (!(currentSong == (songs.length - 1))) {
        currentSong++;


    } else {
        currentSong = 0;
    }
    songs[currentSong].play();
    playing_current();

}

function previous() {

    songs[currentSong].pause();

    if (!currentSong == 0) {
        currentSong--;

    } else {
        currentSong = (songs.length - 1);
    }
    songs[currentSong].play();
    updateSong();
    playing_current();

}

//duration in minutes
function inMinutes(d) {
    var min = (Number(d / 60)).toFixed(0);
    var sec = (d % 60).toFixed(0).toString();
    if (Number(sec) < 10) {
        sec = '0' + sec;
    }
    return min + ':' + sec;

}
//reset duration
function reset() {
    songs[currentSong].currentTime = 0;
}
//shuffle play

function shuffle() {
    currentSong = Math.floor(Math.random() * (songs.length)) + 1;
    playOrPause(currentSong);
}
//seek bar control 
var seek = false;
var changed_elem_id;

function setSeek(x) {
    seek = true;

    changed_elem_id = x;
}

function updateSeekBar() {
    var currentlyPlaying = songs[currentSong];
    seekBar[0].min = 0;
    seekBar[1].min = 0;
    seekBar[0].max = currentlyPlaying.duration;
    seekBar[1].max = currentlyPlaying.duration;
    played_time.innerText = inMinutes(currentlyPlaying.currentTime);
    if (!seek) {
        var elapsed = currentlyPlaying.currentTime;
        seekBar[0].value = elapsed;
        seekBar[1].value = elapsed;
    } else {
        currentlyPlaying.currentTime = ((changed_elem_id == 0) ? seekBar[0].value : seekBar[1].value);
    }
    if (currentlyPlaying.ended && !loop) {
        seekBar[0].value = 0;
        seekBar[1].value = 0;
        currentSong++;
        playOrPause(currentSong);
    }
    if (currentlyPlaying.ended && loop) {
        playOrPause(currentSong);
    }
    seek = false;

}