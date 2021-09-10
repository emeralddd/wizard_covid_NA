import {useContext, useEffect} from 'react'
import {NEWSContext} from '../contexts/newsContext'
import Spinner from 'react-bootstrap/Spinner'
import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'
import SinglePost from '../components/items/SinglePost'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'
import UpdateNEWSModal from '../components/form/UpdateNEWSModal'
import Toast from 'react-bootstrap/Toast'

const NEWSManager = () => {

    const {
        newsState: {news, newsLoading}, 
        getNEWS,
        showToast: {show,message,type},
        setShowToast
    } = useContext(NEWSContext)

    useEffect(() => getNEWS(), [])

    let body = null
    let createNEWS = (
        <Link to='/createnews'>
            <Button variant = 'warning' size='sl' className='ml-2 mt-3'>
                Đăng Tin Tức Mới
            </Button>
        </Link>
    )
    if(newsLoading) {
        body = (
            <div className="d-flex-justify-content-center mt-2">
                <Spinner animation='border' variant='info' />
            </div>
        )
    } else if(news.length === 0) {
        body = (
            <>
                <Card className='text-center mx-5 my-5'>
                    <Card.Header as='h1'>
                        Khum cóa cái tin tứk lào hớt!
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
                        {news.slice(0).reverse().map(_news => (
							<SinglePost key={_news._id} item={_news} type='news'/>
					    ))}
                    </tbody>
                    
                </Table>
            </>
        )
    }

    return (
        <>
            {news!==null? <UpdateNEWSModal />: null}
            <div className="mx-4 mt-3">
                <h1>Danh sách Tin tức</h1>
                {createNEWS}
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

export default NEWSManager
