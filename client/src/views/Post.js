import {useState, useContext, useEffect} from 'react'
import {PostContext} from '../contexts/postContext'
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import axios from 'axios'
import { apiURL } from '../utils/VariableName'
import dateFormat from 'dateformat'
import Table from 'react-bootstrap/esm/Table'

const Post = (props) => {
    
    const id = props.match.params.slug
    const {postState: {posts, postsLoading}, getPosts} = useContext(PostContext)

    const [statusState, setStatusState] = useState({
        loading: false,
        success: 0,
        data: []
    })

    const find = async () => {
        try {
            const response = await axios.get(`${apiURL}/public/getEachPost/${id}`)
            if(response.data.success) {
                setStatusState({
                    loading: false,
                    success: 200,
                    data: [response.data.fetchPost.title,response.data.fetchPost.content,response.data.fetchPost.dateCreated,response.data.fetchPost.userCreated.username,response.data.fetchPost.slug,response.data.fetchPost.imageURL]
                })
            }
        } catch (error) {
            setStatusState({
                loading: false,
                success: 404,
            })
        }
    }
    
    useEffect(() => {
        if(statusState.success===0) find()
        if(!statusState.loading) getPosts()
    }, [statusState.loading])
    
    let body = null
    
    if(statusState.loading||postsLoading) {
        body = (
            <div className="d-flex-justify-content-center mt-2">
                <Spinner animation='border' variant='info' />
            </div>
        )
    } else if(statusState.success === 404) {
        body = (
            <>
                <Card className='text-center mx-5 my-5'>
                    <Card.Header as='h1'>
                        <h1>404</h1>
                        <h3>Khong Ton Tai</h3>
                    </Card.Header>
                </Card>
            </>
        )
    } else {
        body = (
            <>
                <div className='titlePost'>
                    <h1>Blog</h1>
                </div>
                <Row className='mx-auto mt-3'>
                    <Col xs={9}>
                        <div>
                            <img src={statusState.data[5]} width='90%' height='auto' alt='post_img' />
                        </div>
                        <h3 className='mt-3'>{statusState.data[0]}</h3>
                        <h6>Đăng bởi: {statusState.data[3]} - {dateFormat(statusState.data[2], "hh:mm:ss - dd/mm/yyyy")}</h6>
                        <div dangerouslySetInnerHTML={{ __html: statusState.data[1] }} />
                    </Col>
                    <Col xs={3}>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Bài Viết Gần Đây</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.slice(0).reverse().slice(0,5).map(post => {
                                    return (
                                    <tr key={post._id}>
                                        <td><img src={post.imageURL} alt='image' height='auto' width='40px' /></td>
                                        <td><a href={'/post/'+post.slug}>{post.title.substring(0,30)}</a></td>
                                    </tr>
					            )})}
                            </tbody>
                        </Table>
                    </Col>
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

export default Post
