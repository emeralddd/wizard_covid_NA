import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import dateFormat from 'dateformat'

const SinglePost = ({item: {_id, title, content, dateCreated, userCreated, imageURL}}) => (
    <tr>
      <td>{title}</td>
      <td>{content.substring(0,50)}</td>
      <td>{userCreated.username}</td>
      <td>{dateFormat(dateCreated, "hh:mm:ss - dd/mm/yyyy")}</td>
      {imageURL?<td><img src={imageURL} alt='alter' width='100px' height='auto' /></td>:<></>} 
    </tr>
)

export default SinglePost