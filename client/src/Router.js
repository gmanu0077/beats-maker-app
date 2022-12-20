import Old from './old'
import './App.css';
import React, { useContext } from 'react';
import Front from './front'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import User from './user'
import Create from './create'
import Reg from './register'

import AuthContext from "./context/AuthContext";




function Router() {
  var { loggedin } = useContext(AuthContext);



  return (

    <div>
      <h3 className="white-text center">BEAT MAKER</h3>

      <BrowserRouter>
        <Switch>

          <Route exact path="/" component={User} />


          <Route path="/register" component={Reg} />


          <>

            <h2 className="brown-text text-lighten-3 center"> WELCOME</h2>

            <h2 className="deep-orange-text center"> {loggedin?.name || "Beat-Master"}</h2>
            <Route exact path="/beatsmaker" component={Front} />

            <Route exact path="/createbeats" component={Create} />
            <Route exact path="/mybeats" component={Old} />



          </>






        </Switch>

      </BrowserRouter>
    </div>

  );
}

export default Router;
