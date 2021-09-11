import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'

const SingleCard = ({item: {_id, position, total, death, cured}}) => (
    <Card
		className='shadow'
		border={
			total===0 ? 'success' : total <200 ? 'warning' : 'danger'
		}
	>
		<Card.Body>
			<Card.Title>
				<Col>
					<p className='position'>{position}</p>
					<Badge
						pill
						variant={
							total===0 ? 'success' : total <200 ? 'warning' : 'danger'
						}
					>
					</Badge>
				</Col>
			</Card.Title>
			<Card.Text>
                <p>Tổng: {total}</p>
                <p>Tử vong: {death}</p>
                <p>Đã khỏi: {cured}</p>
            </Card.Text>
		</Card.Body>
	</Card>
)

export default SingleCard