import Card from 'react-bootstrap/Card'
import dateFormat from 'dateformat'

const SinglePublicNEWS = ({item: {_id, title, content, dateCreated, userCreated}}) => (
    <Card className='shadow' border='info'>
        <Card.Body>
            <Card.Title>
                <h4>{title}</h4>
            </Card.Title>

            <Card.Text>
                <h6>Đăng vào {dateFormat(dateCreated, "hh:mm:ss - dd/mm/yyyy")}</h6>
                <p>{content.substring(0,300)} ...</p>
            </Card.Text>
        </Card.Body>
	</Card>
)

export default SinglePublicNEWS