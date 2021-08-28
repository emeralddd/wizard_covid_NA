import React from 'react'
import LoginForm from '../components/auth/LoginForm'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import {AuthContext} from '../contexts/authContext'
import {useContext} from 'react'
import {Redirect} from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'



function Auth({authRoute}) {

    //console.log(AuthContext)
    const {authState: {authLoading, isAuthenticated}} = useContext(AuthContext)
    let body

    if(authLoading) {
        body = (
            <div className="d-flex-justify-content-center mt-2">
                <Spinner animation='border' variant='info' />
            </div>
        )
    } else if(isAuthenticated) return <Redirect to='/dashboard' />
    else 
    body = (
        <>
            {authRoute === 'login' && <LoginForm />}
        </>
    )

    return (
        <>
            <div className='login-background'>
                    <Container> 
                        <Card className='text-center border-0 shadow rounded-3 my-5 mx-auto'>
                            <Card.Title className='p-4 p-sm-4'><h1>Login</h1></Card.Title>
                            <Card.Body> 
                                <Row>
                                    <Col sm={7}>
                                        <Image src='https://i.pinimg.com/originals/39/ce/06/39ce061587549e3ef7f043ddb118f79b.jpg' height='500px' rounded/>
                                    </Col>
                                    <Col sm={5}>
                                        {body}
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Container> 
            </div>
        </>
    )
}

export default Auth