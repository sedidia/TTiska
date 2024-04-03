import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Components/Assets/Icomoon/style.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './Components/Assets/Css/Home.css';
import './Components/Cba/Bulletin.css';
import './Components/Assets/Css/Popup.css';
import './Components/Assets/Css/Ttime.css';

import TTiska from './Components/Home/TTiska';
import Notfound from './Components/SmallComponents/Notfound';
import Cba from './Components/Cba/Cba';
import SendServer from './Components/Cba/SendServer';

import TtimeHome from './Components/Ttime/TtimeHome';
import Authent from './Components/SmallComponents/LoginRegister';
import Copie from './Components/Copie/Copie';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
            <Route exact path={'/'}>
              <TTiska />
            </Route>

            {/* teste */}
            <Route exact path={'/Copie'}>
              <Copie />
            </Route>
            {/* teste */}

            {/* Cba solution */}
            <Route exact path={'/Cba'}>
              <Cba />
            </Route>
            <Route exact path={'/SendServer'}>
              <SendServer />
            </Route>
            {/* Cba solution */}

            {/* T-Time solution */}
            <Route exact path={'/Ttime'}>
              <TtimeHome />
            </Route>
            {/* T-Time solution */}

            {/* Auth */}
            <Route exact path={'/Authent'}>
              <Authent />
            </Route>
            {/* Auth */}
            
            <Route path={'*'}>
              <Notfound />
            </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;