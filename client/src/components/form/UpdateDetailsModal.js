import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext,useState,useEffect } from 'react'
import { DetailsContext } from '../../contexts/detailsContext'

const UpdateDetailsModal = () => {

    const {
        detailsState:{detail},
        setShowToast,
        updateDetail,
        showUpdateDetailModal,
        setShowUpdateDetailModal
    } = useContext(DetailsContext)

    const [updateForm,setUpdateForm] = useState(detail)

    useEffect(() => setUpdateForm(detail), [detail])

    const {title,content} = updateForm

    const onChangeUpdateForm = event => setUpdateForm({ ...updateForm, [event.target.name]: event.target.value })

    const onSubmit = async event => {
		event.preventDefault()
		const {success, message} = await updateDetail(updateForm)
        setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
		resetUpdateData()
	}

    const resetUpdateData = () => {
		setUpdateForm(detail)
		setShowUpdateDetailModal(false)
	}

    return (
        <Modal 
            show={showUpdateDetailModal} 
            onHide={resetUpdateData} aria-labelledby="contained-modal-title-vcenter"
            centered
            size="lg"
        >
            <Modal.Header closeButton>
				<Modal.Title>
                    Chỉnh sửa bài Viết
                </Modal.Title>
			</Modal.Header>

            <Form onSubmit={onSubmit}>
                <Modal.Body>
					<Form.Group className='mb-3'>
                        <Form.Control 
                            type='text' 
                            placeholder='Tiêu Đề' 
                            name='title' 
                            value={title}
                            onChange={onChangeUpdateForm} />
					</Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Control 
                            as='textarea' 
                            placeholder='Nội dung' 
                            rows='12'
                            name='content' 
                            value={content}
                            onChange={onChangeUpdateForm} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={resetUpdateData}>
						Cancel
					</Button>
					<Button variant='primary' type='submit'>
						Xác nhận
					</Button>
                </Modal.Footer>   
            </Form>
        </Modal>
    )
}

export default UpdateDetailsModal

