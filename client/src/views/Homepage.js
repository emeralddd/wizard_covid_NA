import Carousel from 'react-bootstrap/Carousel'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import about from '../assets/aboutweb.png'
import Card from 'react-bootstrap/Card'
const Homepage = () => {
    return (
        <>
            <div className='slider'>
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="slider-content"
                            src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/7a326c26993945.5635ecc163415.jpg"
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="slider-content"
                        src="https://pbs.twimg.com/media/DWCPpubX4AEHLxc?format=jpg&name=4096x4096"
                        alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="slider-content"
                        src="https://64.media.tumblr.com/1abeacce5b6f5a00e4178ad0e2b7fb59/tumblr_nx1q4lUuwR1ujj7doo2_1280.jpg"
                        alt="Third slide"
                        />
                    </Carousel.Item>
                </Carousel>
            </div>
            <div className='aboutweb'>
                <Row>
                    <Col>
                        <img 
                            src='https://technext.github.io/medico/img/top_service.png'
                        />
                    </Col>
                    <Col className='about-text'>
                        <h1 className='pb-3'><strong>VỀ WEBSITE</strong></h1>
                        <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Quis ipsum suspendisse ultrices gravida. Risus cmodo viverra maecenas accumsan lacus vel</h4>
                        <div className='d-flex justify-content-center align-items-center mt-5'>
                            <img src='https://technext.github.io/medico/img/icon/banner_2.svg' width='50px'/>
                            <p className='m-0'>Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Quis ipsum suspendisse ultrices gravida. Risus cmodo viverra maecenas accumsan lacus vel </p>
                        </div>
                        <div className='d-flex justify-content-between align-items-center mt-5'>
                            <img src='https://technext.github.io/medico/img/icon/banner_2.svg' width='50px'/>
                            <p className='m-0'>Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Quis ipsum suspendisse ultrices gravida. Risus cmodo viverra maecenas accumsan lacus vel </p>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className='infovirus'>
                <h1><strong>TÍNH NĂNG CHÍNH</strong></h1>
                <Row className='d-flex justify-content-between align-items-center mt-5'>
                    <Col xs={3}>
                        <div className='info-text'>
                            <div className='info-logo-out'>
                                <img src='https://technext.github.io/medico/img/icon/feature_1.svg' className='info-logo-in'/>
                            </div>    
                            <h4>Số liệu</h4>
                            <p>
                                Website cung cấp số liệu về dịch bệnh của 21 đơn vị hành chính tại Nghệ An, cũng như số liệu chung của cả Tỉnh, của cả nước và toàn thế giới.
                            </p>
                            
                        </div>
                        <div className='info-text'>
                            <div className='info-logo-out'>
                                <img src='https://technext.github.io/medico/img/icon/feature_1.svg' className='info-logo-in'/>
                            </div>    
                            <h4>Diễn biến</h4>
                            <p>
                                Website còn có thể cung cấp các diễn biến dịch bệnh theo từng ngày tại các địa phương trong tỉnh, như các ca mới, ca cách ly hay cộng đồng tại Nghệ An.
                            </p>
                        </div>
                    </Col>
                    <Col xs={4}>
                        <img src='https://technext.github.io/medico/img/service.png'/>
                    </Col>
                    <Col xs={3}>
                        <div className='info-text'>
                            <div className='info-logo-out'>
                                <img src='https://technext.github.io/medico/img/icon/feature_1.svg' className='info-logo-in'/>
                            </div>    
                            <h4>Tin Tức</h4>
                            <p>
                                Website cập nhật thêm cả những tin tức về phòng, chống dịch bệnh, hay các công văn chỉ thị của tỉnh chính xác nhất
                            </p>
                        </div>
                        <div className='info-text'>
                            <div className='info-logo-out'>
                                <img src='https://technext.github.io/medico/img/icon/feature_1.svg' className='info-logo-in'/>
                            </div>    
                            <h4>Blog</h4>
                            <p>
                                Ngoài ra, Website còn có những bài viết, blog về các tips phòng dịch, hay những khuyến cáo cũng như các lời khuyên nói chung về dịch bệnh.
                            </p>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className='teams'>
                <h1><strong>ĐỘI NGŨ PHÁT TRIỂN</strong></h1>
                <Row className='mt-5'>
                    <Col>
                        <Card.Img variant='top' src='https://luccicorners.files.wordpress.com/2020/12/fb_img_16065522008565854.jpg?w=410&h&zoom=2' />
                        <Card border='info'>
                        <Card.Header>
                            Project Manager
                        </Card.Header>
                        <Card.Text>    
                            <h3>Nguyễn Khắc Tùng Lâm</h3>
                        </Card.Text>
                        </Card>
                    </Col>
                    <Col>
                        <Card border='info'>
                        <Card.Header>
                            Project Manager
                        </Card.Header>
                        <Card.Text>    
                            <h3>Nguyễn Khắc Tùng Lâm</h3>
                        </Card.Text>
                        </Card>
                    </Col>
                    <Col>
                        <Card border='info'>
                        <Card.Header>
                            Project Manager
                        </Card.Header>
                        <Card.Text>    
                            <h3>Nguyễn Khắc Tùng Lâm</h3>
                        </Card.Text>
                        </Card>
                    </Col>
                    <Col>
                        <Card border='info'>
                        <Card.Header>
                            Project Manager
                        </Card.Header>
                        <Card.Text>    
                            <h3>Nguyễn Khắc Tùng Lâm</h3>
                        </Card.Text>
                        </Card>
                    </Col>
                    <Col>
                        <Card border='info'>
                        <Card.Header>
                            Project Manager
                        </Card.Header>
                        <Card.Text>    
                            <h3>Nguyễn Khắc Tùng Lâm</h3>
                        </Card.Text>
                        </Card>
                    </Col>
                </Row>
            </div>
            <div className='blogs'> 
                <h1>Blog</h1>
                <Row className='mt-5'>
                    <Col>
                        <Card.Img variant='top' src='https://luccicorners.files.wordpress.com/2020/12/fb_img_16065522008565854.jpg?w=410&h&zoom=2' />
                        <Card>
                        <Card.Text>    
                            <h3>Lorem</h3>
                        </Card.Text>
                        </Card>
                    </Col>
                    <Col>
                        <Card.Img variant='top' src='https://luccicorners.files.wordpress.com/2020/12/fb_img_16065522008565854.jpg?w=410&h&zoom=2' />
                        <Card>
                        <Card.Text>    
                            <h3>Lorem</h3>
                        </Card.Text>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Homepage