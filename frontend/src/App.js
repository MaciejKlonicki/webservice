import React, { Component, createContext } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Login from './components/user/Login'
import Registration from './components/user/Registration'
import About from './components/user/About'
import Settings from './components/settings/Settings'
import NavigationBar from './components/NavigationBar'
import Body from './components/posts/Body'
import CreatePost from './components/posts/CreatePost'
import PostDetails from './components/posts/PostDetails'
import EditPost from './components/posts/EditPost'

export const ThemeContext = createContext(null)

class App extends Component {

  state = { email: "", isAuthenticated : false }

  updateEmail = () => {
    const email = localStorage.getItem("email")
    this.setState({ email: email })
    if (email.length > 0) {
      this.setState({isAuthenticated : true})
      console.log("true")
    } else {
      this.setState({isAuthenticated : false})
      console.log("false")
    }
  };

  render() {
  return (
    <Router>
      <Route path="/" component={NavigationBar} />
      <Switch>
        <Route path="/" exact component={Body} />
        <Route path="/login" render={props => <Login history={props.history} updateEmail={this.updateEmail} />}/>
        <Route path='/register' component={Registration} />
        <PrivateRoute path='/settings' exact component={Settings} />
        <PrivateRoute path='/about' component={About} />
        <PrivateRoute path='/create-post' component={CreatePost} />
        <PrivateRoute path='/posts/:id' component={PostDetails} />
        <PrivateRoute path='/edit/:id' component={EditPost} />
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

export default App
