import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Offcanvas from 'react-bootstrap/Offcanvas'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../contexts/authContext'
import {OtherContext} from '../../contexts/otherContext'
import { useContext,useState } from 'react'


const AdminNavbarMenu = () => {
    const {authState: {user: {username}},logoutUser} = useContext(AuthContext)
  
    const logout = () => logoutUser()

    return (
            <Navbar expand='lg' bg='primary' variant='dark' className='p-1'>
                <Container>
                    <Navbar.Brand className='font-weight-bolder text-white'>
                    Logo
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                    <Navbar.Collapse id='responsive-navbar-nav'>
                    <Nav className='me-auto'>
                        
                            <Nav.Link className='font-weight-bolder text-white' to='/dashboard' as={Link}>
                                Dashboard
                            </Nav.Link>
                    
                            <Nav.Link className='font-weight-bolder text-white' to='/' as={Link}>
                                Homepage
                            </Nav.Link>
                      
                            <Nav.Link className='font-weight-bolder text-white' to='/usermanager' as={Link}>
                                Accounts
                            </Nav.Link>
                     
                            <Nav.Link className='font-weight-bolder text-white' to='/postmanager' as={Link}>
                                Posts
                            </Nav.Link>
                      
                                <Nav.Link className='font-weight-bolder text-white' to='/newsmanager' as={Link}>
                                News
                            </Nav.Link>
                      
                            <Nav.Link className='font-weight-bolder text-white' to='/analyticmanager' as={Link}>
                                Analytic
                            </Nav.Link>
                  
                            <Nav.Link className='font-weight-bolder text-white' to='/detailsmanager' as={Link}>
                                Pandemic Details
                            </Nav.Link>
                      
                    </Nav>
                    <Nav>
                        <Nav.Link className='font-weight-bolder text-white' disable='true'>
                            Welcome {username}
                        </Nav.Link>
                        <Button variant='secondary' className='font-weight-bolder text-black mr-1' onClick={logout}>
                                Logout
                        </Button>
                    </Nav>
                    
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    )
}

export default AdminNavbarMenu
