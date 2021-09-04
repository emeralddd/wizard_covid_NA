import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import dateFormat from 'dateformat'

const SinglePublicPost = ({item: {_id, title, content, dateCreated, userCreated, imageURL}}) => (
    <Card className='shadow' border='info'>
        <Card.Body>
            <Card.Title>
                <Col>
                    <h4>{title}</h4>
                </Col>
            </Card.Title>

            <Card.Text>
                <Row className='row-cols-2 g-4 mx-auto mt-3'>
                    <Col xs={2}>
                        <img src={imageURL} alt='post_image' width='100px' height='auto' />
                    </Col>
                    <Col>
                        <h6>Đăng vào {dateFormat(dateCreated, "hh:mm:ss - dd/mm/yyyy")} bởi {userCreated.username}</h6>
                        <p>{content.substring(0,80)}</p>
                    </Col>

                </Row>
            </Card.Text>
        </Card.Body>
	</Card>
)

export default SinglePublicPost