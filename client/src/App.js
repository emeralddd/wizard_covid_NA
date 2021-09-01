import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Dashboard from './views/Dashboard'
import Auth from './views/Auth'
import Homepage from './views/Homepage'
import PandemicMap from './views/PandemicMap'
import './App.css'
import AuthContextProvider from './contexts/authContext'
import ProtectedRoute from './components/routing/ProtectedRoute'
import UserContextProvider from './contexts/userContext'
import UserManager from './views/UserManager'

function App() {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <Router>
          <Switch>
            <Route exact path='/' component={Homepage} />
            <ProtectedRoute exact path='/dashboard' component={Dashboard} />
            <ProtectedRoute exact path='/usermanager' component={UserManager} />
            <Route exact path='/login' render= {props => <Auth {...props} authRoute='login' />} />
            <Route exact path='/pandemicmap' component={PandemicMap} />
          </Switch>
        </Router>
      </UserContextProvider>
    </AuthContextProvider>
  );
}

export default App;
