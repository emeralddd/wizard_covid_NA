import {Route,Redirect} from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/authContext'
import Spinner from 'react-bootstrap/Spinner'
import AdminNavbarMenu from '../layout/AdminNavbarMenu'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

const ProtectedRoute = ({component:Component,...rest}) => {

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

export default ProtectedRoute