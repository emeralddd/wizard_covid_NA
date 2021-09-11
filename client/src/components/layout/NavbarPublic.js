import {useState, React} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Offcanvas from 'react-bootstrap/Offcanvas'
import {Link} from 'react-router-dom'
import LOGO from '../../assets/logo_wt.png'

const NavbarPublic = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Navbar collapseOnSelect expand="lg"  className='p-0 navbar-public'>
                <Container className='justify-content-center'>
        	        <Navbar.Brand to='/' as={Link}>
                        <img src={LOGO} alt='logo' height='80px' width='auto' />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                    <Navbar.Collapse id='responsive-navbar-nav'>
                    <Nav className='m-auto'>
                        <Nav.Link className='font-weight-bolder nav-item' to='/pandemicdetails' as={Link}>
                            Diễn Biến Dịch
                        </Nav.Link>

                        <Nav.Link className='font-weight-bolder nav-item' to='/pandemicmap' as={Link}>
                            Bản Đồ Dịch
                        </Nav.Link>

                        <Nav.Link className='font-weight-bolder nav-item' to='/newslist' as={Link}>
                            Tin Tức
                        </Nav.Link>

                        <Nav.Link className='font-weight-bolder nav-item' to='/postlist' as={Link}>
                            Blog
                        </Nav.Link>
                      
                    </Nav>
                    <Nav className=''>
                        
                        <Button variant='info' className='nav-button font-weight-bolder p-2 px-4' onClick={handleShow}>
                            Liên Lạc
                        </Button>
                    </Nav>
                    
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Offcanvas show={show} onHide={handleClose} placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    Some text as placeholder. In real life you can have the elements you
                    have chosen. Like, text, images, lists, etc.
                </Offcanvas.Body>
            </Offcanvas>

        </>
    )
}

export default NavbarPublic

