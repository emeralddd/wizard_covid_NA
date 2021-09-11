import Card from 'react-bootstrap/Card'
import dateFormat from 'dateformat'

const SinglePublicPost = ({item: {_id, title, content, dateCreated}}) => {
    let a=0;
    return (
        <Card className='shadow detail-pub'>
            <Card.Body>
                <Card.Header className='de-head'>
                    {dateFormat(dateCreated, "HH:MM:ss - dd/mm/yyyy")}
                </Card.Header>
                <Card.Title className='mt-2'>
                    {title}
                </Card.Title>
                {content.split('\n').map(each => (
                    <Card.Text key={++a}>
                        {each}
                </Card.Text>
                ))}
            </Card.Body>
        </Card>
    )
}
export default SinglePublicPost