import {useContext} from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import {AuthContext} from '../contexts/authContext'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const Dashboard = () => {

    const {authState: {user: {username}}} = useContext(AuthContext)


    return (
        <>
            <Card className='m-3' bg='light'>
                <Card.Text>
                    <h1 className='m-3 text-center'>Chào mừng {username} đến với Bảng Điều Khiển của NACDDEU</h1>
                </Card.Text>
            </Card>
            <Card className='m-3' bg='danger' text='light'>
                <Card.Header>
                    Thông Báo Từ Quản Trị Trang
                </Card.Header>
                <Card.Text>
                    <h3 className='m-3 text-center'>Các bạn sử dụng cần cẩn thận, không tự tạo tài khoản mới, cho người khác quyền truy cập vào tài khoản. Không tạo các diễn biến, số liệu, bài viết, tin tức sai sự thật. Nếu thấy có sai phạm sẽ xử phạt theo mức độ nghiêm trọng!</h3>
                </Card.Text>
            </Card>
            <Row className='m-3'>
                <Col>
                    <Card border='success'>
                        <Card.Header>
                            Dăng bài
                        </Card.Header>
                        <Card.Text>   
                            <Row>
                                <Col>
                                    <Link to='/createnews'>
                                        <Button variant = 'warning' size='sl' className='m-2'>
                                            Đăng Tin Tức Mới
                                        </Button>
                                    </Link>
                                </Col>
                                <Col>
                                    <Link to='/createpost'>
                                        <Button variant = 'warning' size='sl' className='m-2'>
                                            Đăng Bài Viết Mới
                                        </Button>
                                    </Link>
                                </Col>
                                <Col>
                                    <Link to='/analyticmanager'>
                                        <Button variant = 'warning' size='sl' className='m-2'>
                                            Đăng Số Liệu
                                        </Button>
                                    </Link>
                                </Col>
                                <Col>
                                    <Link to='/createdetails'>
                                        <Button variant = 'warning' size='sl' className='m-2'>
                                            Đăng Diễn Biến Mới
                                        </Button>
                                    </Link>
                                </Col>
                            </Row>     
                        </Card.Text>
                    </Card>
                </Col>
            </Row>
            
        </>
    )
}

export default Dashboard
