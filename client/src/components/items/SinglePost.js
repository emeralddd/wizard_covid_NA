import dateFormat from 'dateformat'
import ActionButtons from './ActionButtons'
const SinglePost = ({item: {_id, title, content, dateCreated, userCreated, imageURL, slug},type}) => (
    <tr>
      <td width='10%'><ActionButtons _id={_id} slug={slug} type={type}/></td>
      <td width='20%'>{title}</td>
      <td width='auto'>{content.substring(0,50)}</td>
      <td width='10%'>{userCreated.username}</td>
      <td width='15%'>{dateFormat(dateCreated, "hh:mm:ss - dd/mm/yyyy")}</td>
      {imageURL?<td width='15%'><img src={imageURL} alt='alter' width='100%' height='auto' /></td>:<></>} 
    </tr>
)

export default SinglePost