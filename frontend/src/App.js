import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Login from './components/user/Login'
import Registration from './components/user/Registration'
import Settings from './components/settings/Settings'
import NavigationBar from './components/NavigationBar'
import Body from './components/posts/Body'
import CreatePost from './components/posts/CreatePost'
import PostDetails from './components/posts/PostDetails'
import EditPost from './components/posts/EditPost'
import NotFound from './components/NotFound'
import EditPostRating from './components/posts/EditPostRating'
import UserPosts from './components/posts/UserPosts'

const App = () => {

  const setState = useState({
    email: "",
    isAuthenticated: false
  })

  const updateEmail = () => {
    const email = localStorage.getItem("email")
    setState({
      email: email,
      isAuthenticated: email.length > 0
    })
  }

  return (
    <Router>
      <Route path="/" component={NavigationBar} />
      <Switch>
        <Route
          path="/"
          exact
          component={() => <Body isAdmin={localStorage.getItem('role') === 'ADMIN'} />} />
        <Route path="/login" render={(props) => <Login history={props.history} updateEmail={updateEmail} />} />
        <Route path='/register' component={Registration} />
        <PrivateRoute path='/settings' exact component={Settings} />
        <PrivateRoute path='/create-post' component={CreatePost} />
        <Route path='/posts/:id' component={PostDetails} />
        <PrivateRoute path='/edit/:id' component={EditPost} />
        <PrivateRoute path='/edit-rating/:id' component={EditPostRating} />
        <PrivateRoute path='/my-posts' component={UserPosts} />
        <Route path='*' component={NotFound} />
      </Switch>
    </Router>
  )
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem("email") !== null ? (
          <Component {...props} username={localStorage.getItem("username")} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )}
    />
  )
}

export default App
