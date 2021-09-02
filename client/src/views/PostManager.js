import {useContext, useEffect} from 'react'
import {PostContext} from '../contexts/postContext'
import Spinner from 'react-bootstrap/Spinner'
import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'
import SinglePost from '../components/items/SinglePost'

const PostManager = () => {

    const {postState: {posts, postsLoading}, getPosts} = useContext(PostContext)

    useEffect(() => getPosts(), [])

    let body = null
    let createPost = (
        <h3>CreatePost</h3>
    )
    if(postsLoading) {
        body = (
            <div className="d-flex-justify-content-center mt-2">
                <Spinner animation='border' variant='info' />
            </div>
        )
    } else if(posts.length === 0) {
        body = (
            <>
                <Card className='text-center mx-5 my-5'>
                    <Card.Header as='h1'>
                        Khum cóa cái bài ziết lào hớt!
                    </Card.Header>
                </Card>
            </>
        )
    } else {
        body = (
            <>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Tiêu đề</th>
                            <th>Nội dung</th>
                            <th>Tác giả</th>
                            <th>Thời điểm đăng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map(post => (
							<SinglePost item={post} />
					    ))}
                    </tbody>
                    
                </Table>
            </>
        )
    }

    return (
        <div className="m-5">
            <h1>Danh sách Bài Viết</h1>
            {createPost}
            {body}
        </div>
    )
}

export default PostManager
