import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Login from './components/user/Login';
import Registration from './components/user/Registration';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Switch>
      <Route path='/login' exact component={Login}/>
      <Route path='/register' exact component={Registration}/>
      </Switch>
    </Router>
  );
}

export default App;
