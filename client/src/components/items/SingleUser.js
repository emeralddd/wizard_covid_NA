import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import dateFormat from 'dateformat'

const SingleUser = ({item: {_id, username,dateCreated}}) => (
    <tr>
      <td>{username}</td>
      <td>{dateFormat(dateCreated, "hh:mm:ss - dd/mm/yyyy")}</td>
    </tr>
)

export default SingleUser