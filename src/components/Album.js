import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar.js';
import './../styles/Album.css';

class Album extends Component {
   constructor(props) {
      super(props);

      // retrieve the matching album object and assign it to an album variable based on the url parameter -> album.slug
      const album = albumData.find(album => {
         return album.slug === this.props.match.params.slug
      });

      this.state = {
         album: album,
         currentSong: album.songs[0],
         currentTime: 0,
         volume: .5,
         duration: album.songs[0].duration,
         isPlaying: false,
         isHovered: false
      };

      // we are assigning audioElement to 'this', and not state because we need to access
      // the audio element from within class methods. its wont be displayed on the DOM directly.
      this.audioElement = document.createElement('audio');
      this.audioElement.src = album.songs[0].audioSrc;
   }

   // when the component mounts, add event listeners that setState to this.audioElement.currentTime & .duration
   // by assigning eventListeners to 'this', we can refer to it as the second callback parameter when we need to remove it.
   componentDidMount() {
      this.eventListeners = {
         // declare events to update state when component appears
         timeupdate: e => {
            this.setState({ currentTime: this.audioElement.currentTime });
         },
         durationchange: e => {
            this.setState({ duration: this.audioElement.duration });
         },
         volumechange: e => {
            this.setState({ volume: this.audioElement.volume });
         }
      };
      // add event listeners to our audio element onChange
      this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
      this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
      this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
   }

   // remove eventListeners when component unmounts to avoid it continuing to run when no longer on page, and to avoid setState errors.
   componentWillUnmount() {
      this.audioElement.src = null;
      this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
      this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
      this.audioElement.removeEventListener('volumechange', this.eventListeners.volumechange);
   }

   play() {
      this.audioElement.play();
      this.setState({ isPlaying: true });
   }

   pause() {
      this.audioElement.pause();
      this.setState({ isPlaying: false })
   }

   setSong(song) {
      this.audioElement.src = song.audioSrc;
      this.setState({ currentSong: song });
   }

   // create a method and save a variable named isSameSong that is true if
   // the user clicked on the current song, an false otherwise.
   handleSongClick(song) {
      const isSameSong = this.state.currentSong === song;
      if (this.state.isPlaying === true && isSameSong) {
         this.pause();
      } else {
         if (!isSameSong) { this.setSong(song); }
         this.play();
      }
   }

   handlePrevClick() {
      // call findIndex on the album's songs array. If this.state.currentSong is equal to the song being passed into it, make that the the currentIndex.
      const currentIndex = this.state.album.songs.findIndex( song => this.state.currentSong === song);
      const newIndex = Math.max(0, currentIndex -1);
      const newSong = this.state.album.songs[newIndex];
      this.setSong(newSong);
      this.play(newSong);
   }

   handleNextClick() {
      const currentIndex = this.state.album.songs.findIndex( song => this.state.currentSong === song);
      const newIndex = Math.max(0, currentIndex + 1);
      const newSong = this.state.album.songs[newIndex];
      if (newIndex < this.state.album.songs.length) {
         this.setSong(newSong);
         this.play(newSong);
      } else {
         this.pause(newSong);
         return;
      }
   }

   handleTimeChange(e) {
      // newTime = the songs duration multiplied by the event target value that we scroll to.
      const newTime = this.audioElement.duration * e.target.value;
      this.audioElement.currentTime = newTime;
      this.setState({ currentTime: newTime });
   }

   handleVolume(e) {
      const newVolume = e.target.value;
      this.audioElement.volume = newVolume;
      this.setState({ volume: newVolume });
   }

   formatTime(time) {
      let timeDisplay;
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      if (timeDisplay === null || NaN) {
         timeDisplay = '-:--'
      }
      if (seconds < 10) {
         timeDisplay = `${minutes}:0${seconds}`
      } else {
         timeDisplay = `${minutes}:${seconds}`
      }
      return timeDisplay
   }

   render() {
      return (
         <section className="album row">
            <div className="album-info-col col-xs-12 col-md-6">
               <section id="album-info">
                  <div className="album-details">
                     <img id="album-cover-art" src={this.state.album.albumCover} alt="album artwork"/>
                     <h1 id="album-title">{this.state.album.title}</h1>
                     <h2 className="artist">{this.state.album.artist}</h2>
                     <div id="release-info"><em>{this.state.album.releaseInfo}</em></div>
                  </div>
               </section>
            </div>
            <div className="player-bar-songs col-xs-12 col-md-6">
               <div id="song-list">
                     {
                        // Loop through album songs.
                        // onClick call this.handleSongClick and pass in (song).
                        this.state.album.songs.map( (song,index) =>
                           <div className="song row" key={index} onClick={() => this.handleSongClick(song)}
                              onMouseEnter={() => this.setState({ isHovered: index + 1 })}
                              onMouseLeave={() => this.setState({ isHovered: false })} >
                              <div className="song-actions col-xs-8">
                                 <button>
                                 { (this.state.currentSong.title === song.title) ?
                                    <span className={this.state.isPlaying ? "ion-pause" : "ion-play"}></span>
                                    :
                                    (this.state.isHovered === index+1) ?
                                    <span className="ion-play"></span>
                                    :
                                    <span className="song-number">{index+1}</span>
                                 }
                                 </button>
                                 <div className="song-title">{song.title}</div>
                              </div>
                              <div className="song-duration col-xs-4">{this.formatTime(song.duration)}</div>
                           </div>
                        )
                     }
               </div>
               <PlayerBar
                  isPlaying={this.state.isPlaying}
                  currentSong={this.state.currentSong}
                  currentTime={this.audioElement.currentTime}
                  duration={this.audioElement.duration}
                  volume={this.state.volume}
                  handleSongClick={() => this.handleSongClick(this.state.currentSong)}
                  handlePrevClick={() => this.handlePrevClick()}
                  handleNextClick={() => this.handleNextClick()}
                  handleTimeChange={(e) => this.handleTimeChange(e)}
                  handleVolume={(e) => this.handleVolume(e)}
                  formatTime={(time) => this.formatTime(time)}
               />
            </div>
         </section>
      );
   }
}

export default Album;

// this.props.isPlaying ? 'ion-pause' : 'ion-play'
