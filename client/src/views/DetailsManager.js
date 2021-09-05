import {useContext, useEffect} from 'react'
import {DetailsContext} from '../contexts/detailsContext'
import Spinner from 'react-bootstrap/Spinner'
import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'
import SinglePost from '../components/items/SinglePost'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

const DetailsManager = () => {

    const {detailsState: {details, detailsLoading}, getDetails} = useContext(DetailsContext)

    useEffect(() => getDetails(), [])

    let body = null
    let createDetails = (
        <Link to='/createdetails'>
            <Button variant = 'warning' size='sl' className='ml-2 mt-3'>
                Đăng Diễn Biến Mới
            </Button>
        </Link>
    )
    if(detailsLoading) {
        body = (
            <div className="d-flex-justify-content-center mt-2">
                <Spinner animation='border' variant='info' />
            </div>
        )
    } else if(details.length === 0) {
        body = (
            <>
                <Card className='text-center mx-5 my-5'>
                    <Card.Header as='h1'>
                        Khum cóa cái diễn biến lào hớt!
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
                            <th>Tiêu đề</th>
                            <th>Nội dung</th>
                            <th>Tác giả</th>
                            <th>Thời điểm đăng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {details.map(detail => (
							<SinglePost item={detail} />
					    ))}
                    </tbody>
                    
                </Table>
            </>
        )
    }

    return (
        <div className="mx-4 mt-3">
            <h1>Danh sách Diễn Biến Dịch</h1>
            {createDetails}
            {body}
        </div>
    )
}

export default DetailsManager
