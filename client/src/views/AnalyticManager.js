import {useContext, useEffect} from 'react'
import {AnalyticContext} from '../contexts/analyticContext'
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SingleCard from '../components/items/SingleCard'
import Toast from 'react-bootstrap/Toast'
import UpdateAnalyticsModal from '../components/form/UpdateAnalyticsModal'
import Button from 'react-bootstrap/Button'
const AnalyticManager = () => {

    const {
        analyticState: {analytic, analyticLoading}, 
        getAnalytic,
        setShowToast,
        showToast: {show,message,type},
        setShowUpdateModal
    } = useContext(AnalyticContext)

    useEffect(() => getAnalytic(), [])
    
    let body = null
    let createAnalytic = (
        <Button variant = 'warning' size='sl' className='ml-2 mt-3' onClick={setShowUpdateModal.bind(this, true)}>
            Cập nhật số liệu
        </Button>
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
					{analytic.map(each => {
                        return (
						    <Col key={each._id} className='my-2'>
							    <SingleCard item={each} />
						    </Col>
					    )
                    })}
				</Row>
            </>
        )
    }
    
    return (
        <>
            <UpdateAnalyticsModal />
            <div className="mx-4 mt-3">
                <h1>Danh sách Diễn Biến Dịch</h1>
                {createAnalytic}
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

export default AnalyticManager
