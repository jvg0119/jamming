// change to a class Component
// import React from 'react';
// import '../css/Landing.css';
// import WOW from "wowjs";
//
// const Landing = () => (

import React, {Component} from 'react';
import '../css/Landing.css';
import WOW from "wowjs";

class Landing extends Component {

  componentDidMount() {
    const wow = new WOW.WOW();
    wow.init();
  }

  render() {
    return (

      <section className="landing">

        <h1 className="hero-title">Turn the music up!</h1>

        <div className="point wow fadeInUp" data-wow-offset="80" data-wow-delay="0.3s">
          <div className="music-icon"><ion-icon name="microphone"></ion-icon></div>
          <h2 className="point-title">Choose your music</h2>
          <p className="point-description">The world is full of music; why should you have to listen to music that someone else chose?</p>
        </div>
        <div className="point wow fadeInUp" data-wow-offset="80" data-wow-delay="0.3s">
          <div className="music-icon"><ion-icon name="musical-note"></ion-icon></div>
          <h2 className="point-title">Unlimited, streaming, ad-free</h2>
          <p className="point-description">No arbitrary limits. No distractions.</p>
        </div>
        <div className="point wow fadeInUp" data-wow-offset="80" data-wow-delay="0.3s">
          <div className="music-icon"><ion-icon name="musical-notes" ></ion-icon></div>
          <h2 className="point-title">Mobile enabled</h2>
          <p className="point-description">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
        </div>

      </section>

    )
  }
}

export default Landing;
