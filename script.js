// script.js
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const audio = document.getElementById('audio');
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const songTitle = document.getElementById('song-title');
    const artistName = document.getElementById('artist-name');
    const albumArt = document.getElementById('album-art');
    const songList = document.getElementById('song-list');
    
    // Music library
    const songs = [
        {
            title: 'Blinding Lights',
            artist: 'The Weeknd',
            src: 'https://p.scdn.co/mp3-preview/04732a7ee9e3d5b3b7a3b5e5f5a5e5d5a5e5d5a5',
            cover: 'https://i.scdn.co/image/ab67616d00001e02e8b066f70c206551210d902b'
        },
        {
            title: 'Shape of You',
            artist: 'Ed Sheeran',
            src: 'https://p.scdn.co/mp3-preview/04732a7ee9e3d5b3b7a3b5e5f5a5e5d5a5e5d5a5',
            cover: 'https://i.scdn.co/image/ab67616d00001e02e8b066f70c206551210d902b'
        },
        {
            title: 'Dance Monkey',
            artist: 'Tones and I',
            src: 'https://p.scdn.co/mp3-preview/04732a7ee9e3d5b3b7a3b5e5f5a5e5d5a5e5d5a5',
            cover: 'https://i.scdn.co/image/ab67616d00001e02e8b066f70c206551210d902b'
        }
    ];
    
    let currentSongIndex = 0;
    let isPlaying = false;
    
    // Initialize the player
    function initPlayer() {
        // Create playlist
        songs.forEach((song, index) => {
            const li = document.createElement('li');
            li.textContent = `${song.title} - ${song.artist}`;
            li.addEventListener('click', () => loadSong(index));
            songList.appendChild(li);
        });
        
        loadSong(currentSongIndex);
    }
    
    // Load a song
    function loadSong(index) {
        const song = songs[index];
        
        songTitle.textContent = song.title;
        artistName.textContent = song.artist;
        albumArt.src = song.cover;
        audio.src = song.src;
        
        // Update active song in playlist
        const playlistItems = songList.querySelectorAll('li');
        playlistItems.forEach(item => item.classList.remove('playing'));
        playlistItems[index].classList.add('playing');
        
        if (isPlaying) {
            audio.play();
            playBtn.textContent = '⏸';
        }
    }
    
    // Play or pause the current song
    function togglePlay() {
        if (isPlaying) {
            audio.pause();
            playBtn.textContent = '⏵';
        } else {
            audio.play();
            playBtn.textContent = '⏸';
        }
        isPlaying = !isPlaying;
    }
    
    // Play next song
    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(currentSongIndex);
    }
    
    // Play previous song
    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(currentSongIndex);
    }
    
    // Update progress bar
    function updateProgress() {
        const { currentTime, duration } = audio;
        const progressPercent = (currentTime / duration) * 100;
        progressBar.value = progressPercent;
        
        // Update time display
        currentTimeEl.textContent = formatTime(currentTime);
        if (duration) {
            durationEl.textContent = formatTime(duration);
        }
    }
    
    // Set progress when user clicks on progress bar
    function setProgress() {
        const newTime = (progressBar.value / 100) * audio.duration;
        audio.currentTime = newTime;
    }
    
    // Format time in mm:ss
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    // Event listeners
    playBtn.addEventListener('click', togglePlay);
    nextBtn.addEventListener('click', nextSong);
    prevBtn.addEventListener('click', prevSong);
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', nextSong);
    progressBar.addEventListener('input', setProgress);
    
    // Initialize
    initPlayer();
});