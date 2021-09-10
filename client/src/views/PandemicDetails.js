import {useContext, useEffect} from 'react'
import {DetailsContext} from '../contexts/detailsContext'
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
import SinglePublicDetail from '../components/items/SinglePublicDetail'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const PandemicDetails = () => {

    const {detailsState: {details, detailsLoading}, getDetails} = useContext(DetailsContext)

    useEffect(() => getDetails(), [])

    let body = null

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
                        Danh sách trống!
                    </Card.Header>
                </Card>
            </>
        )
    } else {
        body = (
            <>
                <Row className='row-cols-1 g-4 mx-auto mt-3'>
					{details.slice(0).reverse().map(detail => (
						<Col key={detail._id} className='my-2'>
							<SinglePublicDetail item={detail} />
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

export default PandemicDetails
