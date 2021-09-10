import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Dashboard from './views/Dashboard'
import Auth from './views/Auth'
import Homepage from './views/Homepage'
import PandemicMap from './views/PandemicMap'
import ProtectedRoute from './components/routing/ProtectedRoute'
import PublicRoute from './components/routing/PublicRoute'
import AuthContextProvider from './contexts/authContext'
import UserContextProvider from './contexts/userContext'
import PostContextProvider from './contexts/postContext'
import NEWSContextProvider from './contexts/newsContext'
import DetailsContextProvider from './contexts/detailsContext'
import AnalyticContextProvider from './contexts/analyticContext'
import UserManager from './views/UserManager'
import PostManager from './views/PostManager'
import NEWSManager from './views/NEWSManager'
import DetailsManager from './views/DetailsManager'
import AnalyticManager from './views/AnalyticManager'
import './App.css'
import PostList from './views/PostList'
import NEWSList from './views/NEWSList'
import CreateNEWS from './views/CreateNEWS'
import CreatePost from './views/CreatePost'
import PandemicDetails from './views/PandemicDetails'
import CreateDetails from './views/CreateDetails'
import Post from './views/Post'
import NEWS from './views/NEWS'
function App() {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <PostContextProvider>
          <NEWSContextProvider>
            <DetailsContextProvider>
              <AnalyticContextProvider>
                <Router>
                  <Switch>
                    <Route exact path='/login' render= {props => <Auth {...props} authRoute='login' />} />
                    <PublicRoute exact path='/' component={Homepage} />
                    <PublicRoute exact path='/pandemicmap' component={PandemicMap} />
                    <PublicRoute exact path='/postlist' component={PostList} />
                    <PublicRoute exact path='/newslist' component={NEWSList} />
                    <PublicRoute exact path='/pandemicdetails' component={PandemicDetails} />
                    <PublicRoute path='/post/:slug' component={Post} />
                    <PublicRoute path='/news/:slug' component={NEWS} />
                    <ProtectedRoute exact path='/createdetails' component={CreateDetails} />
                    <ProtectedRoute exact path='/createnews' component={CreateNEWS} />
                    <ProtectedRoute exact path='/createpost' component={CreatePost} />
                    <ProtectedRoute exact path='/dashboard' component={Dashboard} />
                    <ProtectedRoute exact path='/usermanager' component={UserManager} />
                    <ProtectedRoute exact path='/postmanager' component={PostManager} />
                    <ProtectedRoute exact path='/newsmanager' component={NEWSManager} />
                    <ProtectedRoute exact path='/detailsmanager' component={DetailsManager} />
                    <ProtectedRoute exact path='/analyticmanager' component={AnalyticManager} />
                  </Switch>
                </Router>
              </AnalyticContextProvider>
            </DetailsContextProvider>
          </NEWSContextProvider>
        </PostContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  );
}

export default App;
