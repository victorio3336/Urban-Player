import React from 'react';
import './../styles/Landing.css';

const Landing = () => (
      <section className="landing">
         <h4 className="hero-title">Your Music always with You </h4>

         <section className="selling-points row">
            <div className="point col-md-4 col-sm-12">
               <i className="ion-music-note"></i>
               <h2 className="point-title">Choose your music</h2>
               <p className="point-description">The world is full of music; why should you have to listen to music that someone else chose?</p>
            </div>
            <div className="point col-md-4 col-sm-12">
               <i className="ion-radio-waves"></i>
               <h2 className="point-title">Unlimited, streaming, ad-free</h2>
               <p className="point-description">No arbitrary limits. No distractions.</p>
            </div>
            <div className="point col-md-4 col-sm-12">
               <i className="ion-wifi"></i>
               <h2 className="point-title">Mobile enabled</h2>
               <p className="point-description">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
            </div>
         </section>
      </section>
);

export default Landing;
