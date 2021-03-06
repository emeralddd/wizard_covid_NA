import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import LOGO from '../../assets/logo.png'
import {Link} from 'react-router-dom'

const Footer = () => {
    return (
        <>
        <div className='footer'>
            <Row>
                <Col xs={6} className='text-center'>
                    <h4 className='mt-6'>NADDEU</h4>
                    <p>
                    NACDDEU là một dự án tham gia kỳ thi Hackathon Nghệ An 2021 do team WIZARD phát triển. Dự án được xây dựng với mục tiêu trở thành một trong những website cung cấp thông tin dịch tễ về bệnh dịch COVID-19 do virus SAR-COV-2 gây ra chính xác và dễ sử dụng nhất tại Nghệ An.
                    </p>
                    <img src={LOGO} height='100px'/>
                </Col>
                <Col xs={2} className='ml-5 mr-5'>
                    <h4 className='mt-6'>LINKS</h4>
                    <Link to='/'>
                        <p>Trang Chủ</p>
                    </Link>
                    <Link to='/pandemicdetails'>
                        <p>Diễn Biến Dịch</p>
                    </Link>
                    <Link to='/pandemicmap'>
                        <p>Bản Đồ Dịch</p>
                    </Link>
                    <Link to='/newslist'>
                        <p>Tin Tức</p>
                    </Link>
                    <Link to='/postlist'>
                        <p>Blog</p>
                    </Link>
                </Col>
                <Col xs={4}>
                    <h4>LIÊN LẠC</h4>
                    <p>Information Manager</p>
                    <p>(+84) 946 450 680</p>
                    <a href='mailto:nguyenkhactunglam2005@gmail.com'><p>Email: nguyenkhactunglam2005@gmail.com</p></a>
                </Col>
            </Row>
        </div>
        <div className="copy text-center mt-3">
        © 2021 Copyright - Bản Quyền Thiết Kế & Nội Dung Website thuộc về WIZARD
        </div>
        </>
    )
}

export default Footer
