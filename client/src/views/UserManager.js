import {useContext, useEffect} from 'react'
import {UserContext} from '../contexts/userContext'
import Spinner from 'react-bootstrap/Spinner'
import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'
import SingleUser from '../components/items/SingleUser'
import { AuthContext } from '../contexts/authContext'

const UserManager = () => {

    const {userState: {users, usersLoading}, getUsers} = useContext(UserContext)
    const {authState: {user:{username}}} = useContext(AuthContext)

    useEffect(() => getUsers(), [])

    let body = null
    let createAccount = null
    if(username==='admin') {
        createAccount = (
            <>
                <h2>Create Account</h2>
            </>
        )
    }

    if(usersLoading) {
        body = (
            <div className="d-flex-justify-content-center mt-2">
                <Spinner animation='border' variant='info' />
            </div>
        )
    } else if(users.length === 0) {
        body = (
            <>
                <Card className='text-center mx-5 my-5'>
                    <Card.Header as='h1'>
                        Dieu nay se khong xay ra dau =)))
                    </Card.Header>
                </Card>
            </>
        )
    } else {
        body = (
            <>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Tên đăng nhập</th>
                            <th>Thời điểm tạo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
							<SingleUser item={user} />
					    ))}
                    </tbody>
                    
                </Table>
            </>
        )
    }

    return (
        <div className="mx-4 mt-3">
            <h1>Danh sách Tài Khoản</h1>
            {createAccount}
            {body}
        </div>
    )
}

export default UserManager
