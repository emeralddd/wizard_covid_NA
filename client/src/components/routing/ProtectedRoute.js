import {Route,Redirect} from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/authContext'
import Spinner from 'react-bootstrap/Spinner'
import AdminNavbarMenu from '../layout/AdminNavbarMenu'

const Protectedroute = ({component:Component,...rest}) => {

    const {authState: {authLoading, isAuthenticated}} = useContext(AuthContext)
    
    if(authLoading) {
        return (
            <div className="d-flex-justify-content-center mt-2">
                <Spinner animation='border' variant='info' />
            </div>
        )

    }

    return (
        <Route {...rest} render={props => isAuthenticated? (
        <>
            <AdminNavbarMenu />
            <Component {...rest} {...props} /> 
        </>) : (
            <Redirect to='/login' />
        )} />
    )
}

export default Protectedroute
