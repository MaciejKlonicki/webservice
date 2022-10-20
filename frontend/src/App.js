import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Login from './components/user/Login';
import Registration from './components/user/Registration';
import Settings from './components/settings/Settings';
import Profile from './components/profile/Profile';

function App() {

  return (
    <div>
      <Router>
          <div className='container'>
            <Switch>
              <Route path="/" exact component={NavigationBar}/>
              <Route path="/login" render={props => <Login updateEmail={this.updateEmail} />}/>
              <Route path='/register' component={Registration}/>
              <Route path='/settings' exact component={Settings}/>
              <Route path='/profile/:id' component={Profile}/>
            </Switch>
          </div>
        </Router>
    </div>
  );
}

export default App;
