///// carousels////

const carousel = [... document.querySelectorAll('.carousel img')]

//variavel para track ou imagem

let carouselImageIndex = 0;

const changeCarousel = () => {
    carousel[carouselImageIndex].classList.toggle('active');

    if(carouselImageIndex >= carousel.length - 1){
        carouselImageIndex = 0;
    } else{
        carouselImageIndex++;
    }
    carousel[carouselImageIndex].classList.toggle('active');
}

/// FICAR PASSANDO AS FOTOS NO CARROSEL DE CIMA
setInterval(() => {
    changeCarousel();

}, 3000)

///////// NAVEGAÇÃO////

//// ALTERANDO AS MUSICAS///

const musicPlayerSection = document.querySelector('.music-player-section'); 

let clickCount = 1;
// SE DAR 2 CLIQUES EMBAIXO ABRE A PAGINA DA MUSICA///
musicPlayerSection.addEventListener('click', () => {
    if(clickCount >= 2) {
        musicPlayerSection.classList.add('active');
        clickCount = 1;
        return;
    }
    clickCount++;
    setTimeout(() => {
        clickCount = 1;
    }, 250);
})
////de volta do reprodutor de música quando apertar o botão///

const backToHomeBtn = document.querySelector('.music-player-section .back-btn');

backToHomeBtn.addEventListener('click', () => {
    musicPlayerSection.classList.remove('active');
})

///Acessar a Playlist///

const playlistSection = document.querySelector('.playlist');
const navBtn = document.querySelector('.music-player-section .nav-btn');

navBtn.addEventListener('click', () => {
    playlistSection.classList.add('active');
})

/// VOLTAR PARA PLAYLIST///

const backToMusicPlayer = document.querySelector('.playlist .back-btn');

backToMusicPlayer.addEventListener('click', () => {
    playlistSection.classList.remove('active');
})

/// FIM DA NAVEGAÇÃO (PRONTA)///


////MUSICA///


let currentMusic = 0;

const music = document.querySelector('#audio-source');
const seekBar = document.querySelector('.music-seek-bar');
const songName = document.querySelector('.current-song-name');
const artistName = document.querySelector('.artist-name'); ///pegando o nome na"music-player-section"
const coverImage = document.querySelector('.cover');
const currentMusicTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.duration');

const queue = [...document.querySelectorAll('.queue')];


///SELECIONAR  OS BOTOES AQUI////

const forwardBtn = document.querySelector('i.fa-forward');
const backwardBtn = document.querySelector('i.fa-backward');
const playBtn = document.querySelector('i.fa-play');
const pauseBtn = document.querySelector('i.fa-pause');
const repeatBtn = document.querySelector('span.fa-redo');
const volumeBtn = document.querySelector('span.fa-volume-up');
const volumeSlide = document.querySelector('.volume-slide');

///play nos botoes////

playBtn.addEventListener('click', () => {
    music.play();
    playBtn.classList.remove('active');
    pauseBtn.classList.add('active');
})

///pause nos botoes////

pauseBtn.addEventListener('click', () => {
    music.pause();
    pauseBtn.classList.remove('active');
    playBtn.classList.add('active');
})

////função para definir uma música/////

const setMusic = (i) => {
    seekBar.value = 0;
    let song = songs[i];
    currentMusic = i;

    music.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artists;
    coverImage.src = song.cover;

    setTimeout(() => {
        seekBar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);///usar formato da duração///
    }, 300);
    currentMusicTime.innerHTML = '00 : 00';
    ///trocar musicas na outra pagina////
    queue.forEach(item => item.classList.remove('active'));
    queue[currentMusic].classList.add('active');
}

setMusic(0);

/// Formato da duração 00:00///


const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if(min < 10){
        min = '0' + min;
    }
    let sec = Math.floor(time % 60);
    if(sec < 10){
        sec = '0' + sec;
    }
    return `${min} : ${sec}` ;
}

///definir intervalo para atualizar nossa barra de bus///
///link do tempo da musica com a barra verde///

setInterval(() => {
   seekBar.value = music.currentTime;
   currentMusicTime.innerHTML = formatTime(music.currentTime); 
   /// botão para voltar a musica quando acabar///
   if(Math.floor(music.currentTime)== Math.floor(seekBar.max)){
       if(repeatBtn.className.includes('active')){
           setMusic(currentMusic);
           playBtn.click();
       } else {
           forwardBtn.click();
       }
   }
}, 500);
///poder adiantar a barra ou atrasar///
seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value;
})

///Botao de Fente(avançar)///

forwardBtn.addEventListener('click', () => {
    if(currentMusic >= songs.length - 1){
        currentMusic = 0;
    } else{
        currentMusic++;
    }
    setMusic(currentMusic);
    playBtn.click();
})

///BOTAO DE VOLTA ///

backwardBtn.addEventListener('click', () => {
    if(currentMusic <= 0){
        currentMusic = songs.length - 1;
    } else{
        currentMusic--;
    }
    setMusic(currentMusic);
    playBtn.click();
})

///REPETIR BOTAO////

repeatBtn.addEventListener('click', () => {
    repeatBtn.classList.toggle('active');
})

/// volume///
volumeBtn.addEventListener('click', () =>{
    volumeBtn.classList.toggle('active');
    volumeSlide.classList.toggle('active');

})

volumeSlide.addEventListener('input', () => {
    music.volume = volumeSlide.value;
})

///mudar as musicas na lista da outra pagina///

queue.forEach((item, i) => {
    item.addEventListener('click', () => {
        setMusic(i);
        playBtn.click();
    })
})