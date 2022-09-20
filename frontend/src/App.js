import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Switch>
      <Route path='/login' exact component={Login}/>
      </Switch>
    </Router>
  );
}

export default App;
