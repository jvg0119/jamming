import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';
import ActionButtons from './ActionButtons';
import '../css/Album.css';
import WOW from "wowjs";

class Album extends Component {

  constructor(props) {
    super(props);

    const album = albumData.find((album) => {
      return album.slug === this.props.match.params.slug
    })

    this.state = {
      album: album,
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      isPlaying: false
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
  }

  play() {
    this.audioElement.play();
    this.setState({isPlaying: true});
  }

  pause() {
    this.audioElement.pause();
    this.setState({isPlaying: false});
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
   const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play()
    }
  }

  handlePrevClick() {
    console.log('handlePrevClick!!!');
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    if (currentIndex === 0) {
      this.setSong(this.state.album.songs[this.state.album.songs.length-1]);
    } else {
      this.setSong(this.state.album.songs[currentIndex -1]);
    }
    this.play();
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    if (currentIndex === this.state.album.songs.length-1) {
      this.setSong(this.state.album.songs[0])
    } else {
      this.setSong(this.state.album.songs[currentIndex+1])
    }
    this.play();
  }

  componentDidMount() {
    const wow = new WOW.WOW();
    wow.init();

    // console.log('componentWillMount in Alubm.js !!!')
    // this.audioElement.addEventListener('timeupdate', (e) => {
    //   this.setState({ currentTime: this.audioElement.currentTime });
    //   // currentTime is an audio property that you can read or set on an audio element
    // });
    //
    // this.audioElement.addEventListener('durationchange', (e) => {
    //   this.setState({ duration: this.audioElement.duration });
    // });
    //durationchange event is fired when the duration attribute has been updated.

    this.eventListeners = {
      timeupdate: (e) => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: (e) => {
        this.setState({ duration: this.state.duration })
      },
    };

    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    // console.log('this.audioElement.duration >>>', this.audioElement.duration) // fixed value (duration)
    // console.log('e.target.value >>> ', e.target.value) // where ever you point your input
                                                      // is in percent we div e.target by duration

    // console.log('newTime >>> ', newTime ) // so now we have to multiply e.target by the duration

    this.audioElement.currentTime = newTime; // setting the this.audioElement's property currentTime to newTime
    this.setState({ currentTime: newTime }); // setting currentTime state to the updated time
  }

  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.setState({currentVolume: newVolume });
    this.audioElement.volume = newVolume;
  }

  formatTime(time) {
    if (isNaN(time) || time === '') { return "-:--" } else {
      const min = Math.trunc(time / 60);
      const temp = Math.trunc(time % 60);
      const sec = temp < 10 ? '0'+ temp : temp;
      const formatedTime = `${min}:${sec}`
      return formatedTime
    }
  }

  render() {
    return (
      <section className="album">

        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt="this.state.album.title"/>
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>

        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>

          <tbody>
            {
              this.state.album.songs.map((song,index) => (

                  <tr className="song" key={index}
                    onClick={() => this.handleSongClick(song)}
                  >
                      <td className="song-actions">

                          <ActionButtons
                            song={song}
                            index={index}
                            currentSong={this.state.currentSong}
                            isPlaying={this.state.isPlaying}
                          />
                      </td>
                      <td className="song-title">{song.title}</td>
                      <td className="song-duration">{this.formatTime(song.duration)}</td>
                  </tr>
              ))
            }
          </tbody>

        </table>

        <PlayerBar
          className="player-bar"
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          currentTime={this.audioElement.currentTime}
          duration={this.audioElement.duration}
          handleTimeChange={(e) => this.handleTimeChange(e)}

          volume={this.audioElement.volume}
          startingVolume={this.state.startingVolume}
          handleVolumeChange={(e) => this.handleVolumeChange(e)}

          formatTime={this.formatTime}
        />

       </section>
    )
  }
}

export default Album;
