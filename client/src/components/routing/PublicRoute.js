import {Route,Redirect} from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/authContext'
import Spinner from 'react-bootstrap/Spinner'
import AdminNavbarSurface from '../layout/AdminNavbarSurface'

const PublicRoute = ({component:Component,...rest}) => {

    const {authState: {isAuthenticated}} = useContext(AuthContext)

    return (
        <Route {...rest} render={props => (
            <>
                {isAuthenticated? (<AdminNavbarSurface />) : null}
                <Component {...rest} {...props} /> 
            </>
        )} />
    )
}

export default PublicRoute
