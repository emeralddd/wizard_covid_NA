import {useContext, useEffect} from 'react'
import {UserContext} from '../contexts/userContext'
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const UserManager = () => {

    const {userState: {users, usersLoading}, getUsers} = useContext(UserContext)

    useEffect(() => getUsers(), [])

    let body = null

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
                <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
					{users.map(user => (
						<Col key={user._id} className='my-2'>
							<SingleItem item={user} />
						</Col>
					))}
				</Row>
            </>
        )
    }

    return (
        <h1>UserManager</h1>
    )
}

export default UserManager
