import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../contexts/authContext'
import { useContext } from 'react'

const AdminNavbarMenu = () => {
    const {authState: {user: {username}},logoutUser} = useContext(AuthContext)
  
    const logout = () => logoutUser()

    return (
        <div>
            <Navbar expand='lg' bg='primary' variant='dark'>
                <Container>
                <Navbar.Brand className='font-weight-bolder text-white ml-2'>
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
                    </Nav>

                    <Nav>
                        <Nav.Link className='font-weight-bolder text-white' disable='true'>
                            Welcome {username}
                        </Nav.Link>
                        <Button variant='secondary' className='font-weight-bolder text-black mr-2' onClick={logout}>
                            Logout
                        </Button>
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default AdminNavbarMenu
