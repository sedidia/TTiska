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
import Auth from './Components/Home/Auth';
import Notfound from './Components/SmallComponents/Notfound';
import Test from './Components/SmallComponents/Test';
import HomeUniv from './Components/Cba/HomeUniv';
import SendServer from './Components/Cba/SendServer';

import TtimeHome from './Components/Ttime/TtimeHome';
import Lire from './Components/Ttime/Lire';
import EveryCollections from './Components/Ttime/EveryCollections';
import Authent from './Components/SmallComponents/LoginRegister';
import Copie from './Components/Copie/Copie';
import SaveCourses from './Components/Ttime/Admin/SaveCourses';
import Painquotidien from './Components/Painquotidien/Painquotidien';
import SaveResult from './Components/Cba/SaveResult';
import ConsultResult from './Components/Cba/ConsultResult';

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
            <Route exact path={'/Test'}>
              <Test />
            </Route>
            {/* teste */}

            {/* Cba solution */}
            <Route exact path={'/SaveResult'}>
              <SaveResult />
            </Route>
            <Route exact path={'/ConsultResult'}>
              <ConsultResult />
            </Route>
            {/* <Route exact path={'/Cba'}>
              <HomeUniv />
            </Route> */}
            <Route exact path={'/SendServer'}>
              <SendServer />
            </Route>
            {/* Cba solution */}

            {/* T-Time solution */}
            <Route exact path={'/SaveCourses'}>
              <SaveCourses />
            </Route>
            <Route exact path={'/Every'}>
              <EveryCollections />
            </Route>
            <Route exact path={'/Lire'}>
              <Lire />
            </Route>
            <Route exact path={'/Ttime'}>
              <TtimeHome />
            </Route>
            <Route exact path={'/Auth'}>
              <Auth />
            </Route>
            {/* T-Time solution */}

            {/* pain cotidien */}
            <Route exact path={'/Auth'}>
              <Auth />
            </Route>
            {/* pain cotidien */}

            {/* Auth */}
            <Route exact path={'/Painquotidien'}>
              <Painquotidien />
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