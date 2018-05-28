// import React from 'react';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from '../data/albums';
import '../css/Library.css'

class Library extends Component {

  constructor (props) {
    super(props);
    this.state = {
      albums: albumData
    };
  }

  render () {
    return (

      <div className="section-library">
        <section className="library">

          {
            this.state.albums.map( (album, index) =>
              <Link to={`/album/${album.slug}`} key={index} className="album-item">
                <div className="image">
                  <img src={album.albumCover} alt={album.title} />
                </div>
                <div>{album.title}</div>
                <div>{album.artist}</div>
                <div>{album.songs.length} songs</div>
              </Link>
            )
          }

        </section>
      </div>
    );
  }
}

export default Library;
