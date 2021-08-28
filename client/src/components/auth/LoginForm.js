import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Link} from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/authContext'
import AlertMessage from '../layout/AlertMessage'

const LoginForm = () => {

    const {loginUser} = useContext(AuthContext)

    const [loginForm,setLoginForm] = useState({
        username: '',
        password: ''
    })

    const [alert,setAlert] = useState(null)

    const {username,password} = loginForm

    const onChangeLoginForm = event => setLoginForm({...loginForm, [event.target.name]:event.target.value})

    const login = async event => {
        event.preventDefault()

        try {
            const loginData = await loginUser(loginForm)
            if(!loginData.success) {
                setAlert({
                    type: 'danger',
                    message: loginData.message
                })
            }
        } catch (error) {
            console.log(error)
        } 
        
    }

    return <>
    <Form onSubmit={login}>
        <AlertMessage info={alert} />
        <Form.Group className='mb-3'>
            <Form.Control 
                type='text' 
                placeholder='Username' 
                name='username' 
                required 
                value={username}
                onChange={onChangeLoginForm} />
        </Form.Group>
        <Form.Group className='mb-3'>
            <Form.Control 
                type='password' 
                placeholder='Password' 
                name='password' 
                required 
                value={password}
                onChange={onChangeLoginForm} />
        </Form.Group>
        <Button className='mb-3' variant = 'success' type='submit'>Login</Button>
    </Form>

    <p>
        <Link to='/'>
            <Button variant = 'info' size='sm' className='ml-2'>Quay Về Trang Chủ</Button>
        </Link>
    </p>
    </>
}

export default LoginForm
