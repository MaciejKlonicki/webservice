import React, { Component, createContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/user/Login';
import Registration from './components/user/Registration';
import About from './components/user/About';
import Settings from './components/settings/Settings';
import Profile from './components/profile/Profile';
import NavigationBar from './components/NavigationBar';


export const ThemeContext = createContext(null);

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
      <Route path="/" component={NavigationBar} />
      <Switch>
      <Route path="/login" render={props => <Login updateEmail={this.updateEmail} />}/>
      <Route path='/register' component={Registration}/>
      <Route path='/settings' exact component={Settings}/>
      <Route path='/profile/:id' component={Profile}/>
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
