import {useContext, useEffect} from 'react'
import {DetailsContext} from '../contexts/detailsContext'
import Spinner from 'react-bootstrap/Spinner'
import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'
import SinglePost from '../components/items/SinglePost'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import UpdateDetailsModal from '../components/form/UpdateDetailsModal'
import Toast from 'react-bootstrap/Toast'

const DetailsManager = () => {

    const {
        detailsState: {details, detailsLoading, detail}, 
        getDetails,
        showToast: {show,message,type},
        setShowToast
    } = useContext(DetailsContext)

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
                            <th className='text-center'>#</th>
                            <th>Tiêu đề</th>
                            <th>Nội dung</th>
                            <th>Tác giả</th>
                            <th>Thời điểm đăng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {details.slice(0).reverse().map(detail => (
							<SinglePost key={detail._id} item={detail} type='detail'/>
					    ))}
                    </tbody>
                    
                </Table>
            </>
        )
    }

    return (
        <>
            {detail!==null? <UpdateDetailsModal />: null}
            <div className="mx-4 mt-3">
                <h1>Danh sách Diễn Biến Dịch</h1>
                {createDetails}
                {body}
            </div>
            <Toast
				show={show}
				style={{ 
                    position: 'fixed', 
                    top: '15%', 
                    right: '15px' 
                }}
				className={`bg-${type} text-white`}
				onClose={setShowToast.bind(this, {
					show: false,
					message: '',
					type: null
				})}
				delay={2000}
				autohide
			>
				<Toast.Body>
					<strong>{message}</strong>
				</Toast.Body>
			</Toast>
        </>
    )
}

export default DetailsManager
