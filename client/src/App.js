import { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import { AuthContext } from './context/AuthContext';
import Home from './pages/home/Home';
import LogIn from './pages/login/LogIn';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
import Explore from './pages/explore/Explore';

function App() {
  const {user} = useContext(AuthContext);

  return (
    <Router>
        <Switch>
            <Route exact path="/">
                {user ? <Home/> : <Register/>}
            </Route>
            <Route path="/login">
                {user ? <Redirect to="/"/> : <LogIn/>}
            </Route>
            <Route path="/register">
                {user ? <Redirect to="/"/> : <Register/>}
            </Route>
            <Route path="/explore">
                {!user ? <Redirect to="/"/> : <Explore/>}
            </Route>
            <Route path="/profile/:username">
                <Profile/>
            </Route>
        </Switch>
    </Router>
  );
}

export default App;
