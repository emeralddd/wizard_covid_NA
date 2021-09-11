import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext,useState } from 'react'
import { UserContext } from '../../contexts/userContext'

const CreateUserModal = () => {

    const {
        addUser,
        showAddUserModal,
        setShowAddUserModal,
        setShowToast
    } = useContext(UserContext)

    const [newUser, setNewUser] = useState({
		username: '',
		password: ''
	})

    const {username,password} = newUser

    const onChangeNewUserForm = event => setNewUser({ ...newUser, [event.target.name]: event.target.value })

    const onSubmit = async event => {
		event.preventDefault()
		const {success, message} = await addUser(newUser)
        setShowToast({ 
            show: true, 
            message, 
            type: success ? 'success' : 'danger' 
        })
		resetAddUserData()
	}

    const resetAddUserData = () => {
		setNewUser({
            username: '',
		    password: ''
        })
		setShowAddUserModal(false)
	}


    return (
        <Modal show={showAddUserModal} onHide={resetAddUserData} aria-labelledby="contained-modal-title-vcenter"
        centered>
            <Modal.Header closeButton>
				<Modal.Title>
                    Tạo Tài Khoản Admin mới
                </Modal.Title>
			</Modal.Header>

            <Form onSubmit={onSubmit}>
                <Modal.Body>
					<Form.Group className='m-3'>
                        <Form.Control
                            type='text'
                            placeholder='Username'
                            name='username'
                            required
                            value={username}
                            onChange={onChangeNewUserForm}
                        />
					</Form.Group>
                    <Form.Group className='m-3'>
                        <Form.Control
                            type='password'
                            placeholder='Password'
                            name='password'
                            required
                            value={password}
                            onChange={onChangeNewUserForm}
                        />
					</Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={resetAddUserData}>
						Cancel
					</Button>
					<Button variant='primary' type='submit'>
						Tạo
					</Button>
                </Modal.Footer>   
            </Form>
        </Modal>
    )
}

export default CreateUserModal

