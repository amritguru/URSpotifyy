console.log("JavaScript is linked properly.");

let currentSong = new Audio();
let songs 
function secondToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0){
        return "00:00"
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedSeconds = String(minutes).padStart(2, '0');
    const formattedMinutes = String(remainingSeconds).padStart(2, '0');
   
    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getsongs() {
    let a = await fetch("http://127.0.0.1:5500/musics/");
    let response = await a.text();
    let div = document.createElement('div');
    div.innerHTML = response;
    let as = div.getElementsByTagName('a');
    let songs = [];
    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith('.mp3')) {
            songs.push(element.href.split("/musics/")[1]);
        }
    }
    return (songs);
}

const playMusic = (track) => {
    // let audio = new Audio(`musics/${track}`);
    currentSong.src = `musics/${track}`;
    currentSong.play();
    play.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrCGLIwOon5HPIoc4_cyL4GKBUyiM8P9avHLQDi5EvQLwJ_LUGhL0aqvYkKKt8_i3rSOo&usqp=CAU";
    document.querySelector(".songName").innerHTML = track;
    document.querySelector(".songtime").innerHTML = "3:45";
}

async function main() {


    //get the list of the songs
     songs = await getsongs();



    //show all the songs in the playlist   .songlist
    let songul = document.querySelector('.songlist');
    for (const song of songs) {
        songul.innerHTML = songul.innerHTML + `<li><div class="songitem">
                            <div class="playicon1">
                                <img src="https://static.vecteezy.com/system/resources/previews/056/332/628/non_2x/modern-music-logo-design-vector.jpg"
                                    alt="">
                            </div>
                            <div class="songinfo">
                                <div> ${song.replace("bgm", " ")}</div>
                                <div>Amrit Guru</div>
                            </div>
                            </div>
                            <div class="playicon">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrCGLIwOon5HPIoc4_cyL4GKBUyiM8P9avHLQDi5EvQLwJ_LUGhL0aqvYkKKt8_i3rSOo&usqp=CAU"  alt="">
                            </div> </li>`;
    }

    //Attach an event listener to each song
    Array.from(document.querySelector('.songlist').getElementsByTagName("li")).forEach(e => {
        e.addEventListener('click', () => {
            console.log(e.querySelector(".songinfo").firstElementChild.innerHTML);
            playMusic(e.querySelector(".songinfo").firstElementChild.innerHTML.trim());
        });
    });

    //Attach event listener to the play button prious play next
    play.addEventListener('click', () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJV11S9mhr3kVc5OUHoCpWrsPxEPxijvOCCA&s";
        }
        else {
            currentSong.pause();
            play.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrCGLIwOon5HPIoc4_cyL4GKBUyiM8P9avHLQDi5EvQLwJ_LUGhL0aqvYkKKt8_i3rSOo&usqp=CAU";
        }
    })

    //listen to the timeupdate event on the audio element
    currentSong.addEventListener("timeupdate", () => {
        console.log(currentSong.currentTime, currentSong.duration);
        document.querySelector('.songtime').innerHTML =`
        ${secondToMinutesSeconds(currentSong.currentTime)} |
         ${secondToMinutesSeconds(currentSong.duration)}`
         document.querySelector(".playtik").style.left = 
         (currentSong.currentTime / currentSong.duration) * 100 + "%"; 
});
    //move the playtik according to the current time and duration of the song
    document.querySelector(".playline").addEventListener('click', e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".playtik").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100
    })

    //Add an event listener to to the next and previous button
    previous.addEventListener('click', () => {
        console.log("previous clicked");
        let index = songs.indexOf(currentSong.src.split("/musics/")[1]);
        if( (index -1) >= 0 ){
            playMusic(songs[index - 1]);    
        }
    })
    next.addEventListener('click', () => {
        console.log("next clicked");
        let index = songs.indexOf(currentSong.src.split("/musics/")[1]);
        if ((index + 1) < songs.length){
            playMusic(songs[index + 1]);    
        }
    })


}
    
main();