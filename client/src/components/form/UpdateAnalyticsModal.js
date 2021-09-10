import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext,useState } from 'react'
import {AnalyticContext } from '../../contexts/analyticContext'

const UpdateAnalyticsModal = () => {

    const {
        analyticState:{analytic,nowAna},
        findAnalytic,
        updateAnalytic,
        showUpdateModal,
        setShowUpdateModal,
        setShowToast
    } = useContext(AnalyticContext)
/*
{
        position:'',
        total:0,
        death: 0,
        cured: 0,
        cure: 0
    }

*/

    const [newData, setNewData] = useState(nowAna)

    const {position,total,death,cured,cure} = newData

    const loadAna = pos => {
        return findAnalytic(pos)
    }

    const onChangeSelect = async event => {
        if(event.target.value !== "") {
            const data = await loadAna(event.target.value)
            setNewData(data)
        }
    }

    const onChangeDataForm = event => setNewData({ ...newData, [event.target.name]: event.target.value })

    const onSubmit = async event => {
		event.preventDefault()
        console.log(newData)
		const {success, message} = await updateAnalytic(newData)
        setShowToast({ 
            show: true, 
            message, 
            type: success ? 'success' : 'danger' 
        })
		resetNewData()
	}

    const resetNewData = () => {
		setNewData(nowAna)
		setShowUpdateModal(false)
	}


    return (
        <Modal  
            size="lg" 
            show={showUpdateModal} 
            onHide={resetNewData} 
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
				<Modal.Title>
                    Tạo Tài Khoản Admin mới
                </Modal.Title>
			</Modal.Header>

            <Form onSubmit={onSubmit}>
                <Modal.Body>
					<Form.Group className='m-3'>
                        <Form.Select 
                            aria-label="Default"
                            name='position'
                            required
                            value={position}
                            onChange={onChangeSelect}
                        >
                            <option value=""></option>
                            <option value='vinh'>Vinh</option>
                            <option value='cualo'>Cửa Lò</option>
                            <option value='hoangmai'>Hoàng Mai</option>
                            <option value='thaihoa'>Thái Hòa</option>
                            <option value='anhson'>Anh Sơn</option>
                            <option value='concuong'>Con Cuông</option>
                            <option value='dienchau'>Diễn Châu</option>
                            <option value='doluong'>Đô Lương</option>
                            <option value='hungnguyen'>Hưng Nguyên</option>
                            <option value='kyson'>Kỳ Sơn</option>
                            <option value='namdan'>Nam Đàn</option>
                            <option value='nghiloc'>Nghi Lộc</option>
                            <option value='nghiadan'>Nghĩa Đàn</option>
                            <option value='quephong'>Quế Phong</option>
                            <option value='quychau'>Quỳ Châu</option>
                            <option value='quyhop'>Quỳ Hợp</option>
                            <option value='quynhluu'>Quỳnh Lưu</option>
                            <option value='tanky'>Tân Kỳ</option>
                            <option value='thanhchuong'>Thanh Chương</option>
                            <option value='tuongduong'>Tương Dương</option>
                            <option value='yenthanh'>Yên Thành</option>
                            <option value='nghean'>Nghệ An (toàn tỉnh)</option>
                            <option value='vietnam'>Việt Nam (toàn nước)</option>
                            <option value='thegioi'>Thế Giới (toàn thế giới)</option>
                        </Form.Select>
					</Form.Group>
                    
                    <Form.Group className='m-3'>
                        <Form.Label>
                            Tổng số ca ghi nhận (tất cả)
                        </Form.Label>
                        <Form.Control
                            type='number'
                            min='0'
                            name='total'
                            required
                            value={total}
                            onChange={onChangeDataForm}
                        />
					</Form.Group>
                    
                    <Form.Group className='m-3'>
                        <Form.Label>
                            Số ca tử vong (tất cả)
                        </Form.Label>
                        <Form.Control
                            type='number'
                            min='0'
                            name='death'
                            required
                            value={death}
                            onChange={onChangeDataForm}
                        />
					</Form.Group>
                    
                    <Form.Group className='m-3'>
                        <Form.Label>
                            Số ca chữa khỏi/chuyển tuyến trên (chỉ áp dụng với NA, VN)
                        </Form.Label>
                        <Form.Control
                            type='number'
                            min='0'
                            name='cured'
                            required
                            value={cured}
                            onChange={onChangeDataForm}
                        />
					</Form.Group>
                    
                    <Form.Group className='m-3'>
                        <Form.Label>
                        Số ca đang điều trị (chỉ áp dụng với NA, VN)
                        </Form.Label>
                        <Form.Control
                            type='number'
                            min='0'
                            name='cure'
                            required
                            value={cure}
                            onChange={onChangeDataForm}
                        />
					</Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={resetNewData}>
						Cancel
					</Button>
					<Button variant='primary' type='submit'>
						Cập nhật
					</Button>
                </Modal.Footer>   
            </Form>
        </Modal>
    )
}

export default UpdateAnalyticsModal

