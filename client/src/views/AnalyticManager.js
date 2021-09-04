import {useContext, useEffect} from 'react'
import {AnalyticContext} from '../contexts/analyticContext'
import Spinner from 'react-bootstrap/Spinner'
import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SingleCard from '../components/items/SingleCard'

const AnalyticManager = () => {

    const {analyticState: {analytic, analyticLoading}, getAnalytic} = useContext(AnalyticContext)

    useEffect(() => getAnalytic(), [])

    let body = null
    let createAnalytic = (
        <h3>Create Analytic</h3>
    )
    if(analyticLoading) {
        body = (
            <div className="d-flex-justify-content-center mt-2">
                <Spinner animation='border' variant='info' />
            </div>
        )
    } else if(analytic.length === 0) {
        body = (
            <>
                <Card className='text-center mx-5 my-5'>
                    <Card.Header as='h1'>
                        jztroi
                    </Card.Header>
                </Card>
            </>
        )
    } else {
        body = (
            <>
                <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
					{analytic.map(each => (
						<Col key={each._id} className='my-2'>
							<SingleCard item={each} />
						</Col>
					))}
				</Row>
            </>
        )
    }

    return (
        <div className="mx-4 mt-3">
            <h1>Danh sách Diễn Biến Dịch</h1>
            {createAnalytic}
            {body}
        </div>
    )
}

export default AnalyticManager
