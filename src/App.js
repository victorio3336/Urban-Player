import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './styles/App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';

class App extends Component {
   render() {
      return (
         // <Link > is a React component like Nav, except it links to a specific component using 'to' instead of 'href'.
         // <Route /> is React component that displays when we navigate to the specific path. It then renders the component that we specify.
         <div className="App">
            <div className="container-fluid">
               <div className="row">
                  <ul className="nav-bar col-xs-12">
                        
                        <li><Link to="/"><h1> Urban Player</h1></Link></li>
                        <li className="my-music"><Link to="/library"><h2>Your Library</h2></Link></li>
                  </ul>
                  <main className="col-xs-12">
                     <Route exact path="/" component={Landing} />
                     <Route path="/library" component={Library} />
                     <Route path="/album/:slug" component={Album} />
                  </main>
               </div>
            </div>
         </div>
      );
   }
}

export default App;

// under source make a stylesheets folder, then put all component css in there.
// small projects - put css in the same exact location as the js. ie src/components. keep them side by side.
// if sylesheet folder, make sure ../..
// otherwise, put in index.css. - things that you want globally, not per component. anything that i know is universal.
