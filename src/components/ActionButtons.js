import React, { Component} from 'react';
import '../css/ActionButtons.css';

class ActionButtons extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isHovered: false
    }
  }

  onMouseEnterHandler(song) {
    if (song) {
      this.setState({isHovered: true})
    }
    // console.log('isHovered at onMouseEnderHandler HOVERING', this.state.isHovered)
    // it shows the previous state
  }

  onMouseLeaveHandler(song) {
    if (song) {
      this.setState({isHovered: false});
    }
    // console.log('isHovered at onMouseLeaveHandler LEAVING', this.state.isHovered)
  }

  render() {
    let className;
    const selectedSong = this.props.song === this.props.currentSong;

      if (this.props.isPlaying && selectedSong) {
        className = "ion-pause"
      } else if ( (this.state.isHovered && this.props.isPlaying && !selectedSong)
      || (this.state.isHovered && !this.props.isPlaying) ) {
        className = "ion-play"
      } else {
        className = "song-number"
      }

    return (
      <div>

        <span
          onMouseEnter={() => this.onMouseEnterHandler(this.props.song)}
          onMouseLeave={() => this.onMouseLeaveHandler(this.props.song)}
          className={className}
        >
        {
          this.state.isHovered || (selectedSong && this.props.isPlaying)
          ?
          ""
          :
          this.props.index + 1
        }
        </span>

      </div>
    )
  }
}

export default ActionButtons;
