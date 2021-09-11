import dateFormat from 'dateformat'

const SingleUser = ({item: {_id, username,dateCreated}}) => (
    <tr>
      <td>{username}</td>
      <td>{dateFormat(dateCreated, "hh:mm:ss - dd/mm/yyyy")}</td>
    </tr>
)

export default SingleUser