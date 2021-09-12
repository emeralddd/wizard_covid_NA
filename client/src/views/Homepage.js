import Carousel from 'react-bootstrap/Carousel'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import about from '../assets/img-1.png'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import SLIDER1 from '../assets/slider-1.png'
import SLIDER2 from '../assets/slider-2.png'
import SLIDER3 from '../assets/slider-3.jpg'
import check from '../assets/patch-check.svg'
import star from '../assets/stars.svg'
import solieu from '../assets/graph-up.svg'
import dienbien from '../assets/card-text.svg'
import tintuc from '../assets/newspaper.svg'
import blog from '../assets/blockquote-left.svg'
import tinhnang from '../assets/tinhnang.png'

const Homepage = () => {
    return (
        <>
            <div className='slider'>
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="slider-content"
                            src={SLIDER1}
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="slider-content"
                        src={SLIDER2}
                        alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="slider-content"
                        src={SLIDER3}
                        alt="Third slide"
                        />
                    </Carousel.Item>
                </Carousel>
            </div>
            <div className='aboutweb'>
                <Row>
                    <Col>
                        <img 
                            src={about}
                        />
                    </Col>
                    <Col className='about-text'>
                        <h1 className='pb-3'><strong>VỀ WEBSITE</strong></h1>
                        <h4>NACDDEU là một dự án được xây dựng với mục tiêu trở thành một trong những website cung cấp thông tin dịch tễ về bệnh dịch COVID-19 do virus SAR-COV-2 gây ra tại Nghệ An. Với 2 tiêu chí chính: Đó là CHÍNH XÁC và DỄ SỬ DỤNG nhất tại Nghệ An.</h4>
                        <div className='d-flex justify-content-center align-items-center mt-5'>
                            <img src={check} width='250px'/>
                            <p className='about-text-1'>Mọi thông tin của website đều được lấy từ các trang rất uy tín như: Trung tâm kiểm soát bệnh tật Nghệ An (CDC Nghệ An), Cổng Thông tin Điện tử Sở Y tế Nghệ An, Bộ Y Tế, Trang thông tin về dịch bệnh COVID-19 của WHO ,... nên được đảm bảo tính chính xác cao </p>
                        </div>
                        <div className='d-flex justify-content-between align-items-center mt-5'>
                            <img src={star} width='150px'/>
                            <p className='about-text-1'>Với giao diện đơn giản, người dùng có thể nhanh chóng hiểu được các sử dụng và truy cập vào các phần của trang web.  </p>
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
                                <img src={solieu} className='info-logo-in'/>
                            </div>    
                            <h4>Số liệu</h4>
                            <p>
                                Website cung cấp số liệu về dịch bệnh của 21 đơn vị hành chính tại Nghệ An, cũng như số liệu chung của cả Tỉnh, của cả nước và toàn thế giới.
                            </p>
                            
                        </div>
                        <div className='info-text'>
                            <div className='info-logo-out'>
                                <img src={dienbien} className='info-logo-in'/>
                            </div>    
                            <h4>Diễn biến</h4>
                            <p>
                                Website còn có thể cung cấp các diễn biến dịch bệnh theo từng ngày tại các địa phương trong tỉnh, như các ca mới, ca cách ly hay cộng đồng tại Nghệ An.
                            </p>
                        </div>
                    </Col>
                    <Col xs={4}>
                        <img src={tinhnang}/>
                    </Col>
                    <Col xs={3}>
                        <div className='info-text'>
                            <div className='info-logo-out'>
                                <img src={tintuc} className='info-logo-in'/>
                            </div>    
                            <h4>Tin Tức</h4>
                            <p>
                                Website cập nhật thêm cả những tin tức về phòng, chống dịch bệnh, hay các công văn chỉ thị của tỉnh chính xác nhất
                            </p>
                        </div>
                        <div className='info-text'>
                            <div className='info-logo-out'>
                                <img src={blog} className='info-logo-in'/>
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
                        {/*<Card.Img variant='top' src='https://luccicorners.files.wordpress.com/2020/12/fb_img_16065522008565854.jpg?w=410&h&zoom=2' /> */}
                        <Card border='info'>
                        <Card.Header>
                            Lập Trình & Nội dung
                        </Card.Header>
                        <Card.Text style={{height: '120px'}}>  
                            <Badge bg="warning" className='mb-2 mt-2'>Thành Viên</Badge>    
                            <h3 className='text-center'>Nguyễn Khắc Tùng Lâm</h3>
                        </Card.Text>
                        </Card>
                    </Col>
                    <Col>
                        <Card border='info'>
                        <Card.Header>
                            Lập Trình
                        </Card.Header>
                        <Card.Text style={{height: '120px'}}>  
                            <Badge bg="warning" className='mb-2 mt-2'>Thành Viên</Badge>  
                            <h3 className='text-center'>Phan Văn Huy</h3>
                        </Card.Text>
                        </Card>
                    </Col>
                    <Col>
                        <Card border='info'>
                        <Card.Header>
                            Lập Trình
                        </Card.Header>
                        <Card.Text style={{height: '120px'}}>    
                            <Badge bg="success" className='mb-2 mt-2'>Trưởng nhóm</Badge>
                            <h3 className='text-center'>Nguyễn Tất Lê Huy</h3>
                        </Card.Text>
                        </Card>
                    </Col>
                    <Col>
                        <Card border='info'>
                        <Card.Header>
                            Nội Dung
                        </Card.Header>
                        <Card.Text style={{height: '120px'}}>
                            <Badge bg="warning" className='mb-2 mt-2'>Thành Viên</Badge>  
                            <h3 className='text-center'>Trần Quang Việt</h3>
                        </Card.Text>
                        </Card>
                    </Col>
                    <Col>
                        <Card border='info'>
                        <Card.Header>
                            Nội Dung
                        </Card.Header>
                        <Card.Text style={{height: '120px'}}>    
                            <Badge bg="warning" className='mb-2 mt-2'>Thành Viên</Badge>  
                            <h3 className='text-center'>Nguyễn Thị Tú Oanh</h3>
                        </Card.Text>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Homepage