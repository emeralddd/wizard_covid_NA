import {useContext, useEffect} from 'react'
import {PostContext} from '../contexts/postContext'
import Spinner from 'react-bootstrap/Spinner'
import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'
import SinglePost from '../components/items/SinglePost'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const PostManager = () => {

    const {postState: {posts, postsLoading}, getPosts} = useContext(PostContext)

    useEffect(() => getPosts(), [])

    let body = null
    let createPost = (
        <Link to='/createpost'>
            <Button variant = 'warning' size='sl' className='ml-2 mt-3'>
                Đăng Bài Viết Mới
            </Button>
        </Link>
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
                            <th>Ảnh đại diện</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.slice(0).reverse().map(post => (
							<SinglePost item={post} />
					    ))}
                    </tbody>
                    
                </Table>
            </>
        )
    }

    return (
        <div className="mx-4 mt-3">
            <h1>Danh sách Bài Viết</h1>
            {createPost}
            {body}
        </div>
    )
}

export default PostManager
