import {useContext, useEffect} from 'react'
import {NEWSContext} from '../contexts/newsContext'
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
import SinglePublicNEWS from '../components/items/SinglePublicNEWS'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const NEWSList = () => {

    const {newsState: {news, newsLoading}, getNEWS} = useContext(NEWSContext)

    useEffect(() => getNEWS(), [])

    let body = null

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
                        Danh sách trống!
                    </Card.Header>
                </Card>
            </>
        )
    } else {
        body = (
            <>
                <Row className='row-cols-1 g-4 mx-auto mt-3'>
					{news.slice(0).reverse().map(item => (
						<Col key={item._id} className='my-2'>
							<SinglePublicNEWS item={item} />
						</Col>
					))}
				</Row>
            </>
        )
    }

    return (
        <div className="mx-4 mt-3">
            {body}
        </div>
    )
}

export default NEWSList
