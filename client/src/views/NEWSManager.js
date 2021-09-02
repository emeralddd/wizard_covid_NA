import {useContext, useEffect} from 'react'
import {NEWSContext} from '../contexts/newsContext'
import Spinner from 'react-bootstrap/Spinner'
import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'
import SinglePost from '../components/items/SinglePost'

const NEWSManager = () => {

    const {newsState: {news, newsLoading}, getNEWS} = useContext(NEWSContext)

    useEffect(() => getNEWS(), [])

    let body = null
    let createNEWS = (
        <h3>CreateNEWS</h3>
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
                            <th>Tiêu đề</th>
                            <th>Nội dung</th>
                            <th>Tác giả</th>
                            <th>Thời điểm đăng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {news.map(subnews => (
							<SinglePost item={subnews} />
					    ))}
                    </tbody>
                    
                </Table>
            </>
        )
    }

    return (
        <div className="m-5">
            <h1>Danh sách Tin tức</h1>
            {createNEWS}
            {body}
        </div>
    )
}

export default NEWSManager
