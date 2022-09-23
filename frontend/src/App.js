import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Login from './components/user/Login';
import Registration from './components/user/Registration';
import About from './components/user/About';
import Settings from './components/settings/Settings';

class App extends Component {
  state = { email: "", isAuthenticated : false };

  updateEmail = () => {
    const email = localStorage.getItem("email");
    this.setState({ email: email });
    if (email.length > 0) {
      this.setState({isAuthenticated : true});
      console.log("true");
    } else {
      this.setState({isAuthenticated : false});
      console.log("false");
    }
  };

  render() {
  return (
    <Router>
      <NavigationBar />
      <Switch>
      <Route path="/login" render={props => <Login updateEmail={this.updateEmail} />}/>
      <Route path='/register' component={Registration}/>
      <Route path='/settings' component={Settings}/>
      <PrivateRoute path='/about' component={About}/>
      </Switch>
    </Router>
  );
}
}

function PrivateRoute({ component: Component, ...rest}) {
  return (
    <Route
      {...rest}
      render={props =>
      localStorage.getItem("email") !== null ? (
        <Component {...props} />
      ) : (
        <Redirect
        to={{
          pathname: "/login",
          state: {from: props.location}
        }}
        />
      )}
      />
  );
}

export default App;
