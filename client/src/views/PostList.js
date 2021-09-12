import {useContext, useEffect} from 'react'
import {PostContext} from '../contexts/postContext'
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
import SinglePublicPost from '../components/items/SinglePublicPost'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const PostList = () => {

    const {postState: {posts, postsLoading}, getPosts} = useContext(PostContext)

    useEffect(() => getPosts(), [])
    
    /*const [pagination, setPagination] = useState({
        data: posts,
        offset: 0,
        numberPerPage: 1,
        pageCount: 0,
        currentData: []
    })*/
    /*useEffect(() => {
        if(!postsLoading)
        {
            setPagination((prevState) => ({
                ...prevState,
                pageCount: prevState.data.length / prevState.numberPerPage,
                currentData: prevState.data.slice(pagination.offset, pagination.offset + pagination.numberPerPage)
            }))
        }
    }, [pagination.numberPerPage, pagination.offset])

    const handlePageClick = event => {
        const selected = event.selected
        const offset = selected * pagination.numberPerPage
        setPagination({
            ...pagination, 
            offset 
        })
    }*/

    let body = null

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
                        Danh sách trống!
                    </Card.Header>
                </Card>
            </>
        )
    } else {
        body = (
            <>
                <Row className='row-cols-1 g-4 mx-auto mt-3'>
					{posts.slice(0).reverse().map(post => (
						<Col key={post._id} className='my-2'>
							<SinglePublicPost item={post} />
						</Col>
					))}
				</Row>
            </>
        )
    }

    return (
        <>
        <div className='titlePost'>
                    <h1>BLOG</h1>
            </div>
        <div className="mx-4 mt-3">
            {body}
        </div>
        </>
    )
}

export default PostList
