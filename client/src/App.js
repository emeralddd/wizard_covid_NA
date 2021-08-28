import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Dashboard from './views/Dashboard'
import Auth from './views/Auth'
import Homepage from './views/Homepage'

import './App.css'
import AuthContextProvider from './contexts/authContext'
import ProtectedRoute from './components/routing/ProtectedRoute'

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <ProtectedRoute exact path='/dashboard' component={Dashboard} />
          <Route exact path='/login' render= {props => <Auth {...props} authRoute='login' />} />
          <Route exact path='/' component={Homepage} />
        </Switch>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
