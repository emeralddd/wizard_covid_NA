import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext,useState,useEffect } from 'react'
import { NEWSContext } from '../../contexts/newsContext'

const UpdateNEWSModal = () => {

    const {
        newsState:{_news},
        setShowToast,
        updateNEWS,
        showUpdateNEWSModal,
        setShowUpdateNEWSModal
    } = useContext(NEWSContext)

    const [updateForm,setUpdateForm] = useState(_news)

    useEffect(() => setUpdateForm(_news), [_news])

    const {title,content,slug} = updateForm

    const onChangeUpdateForm = event => setUpdateForm({ ...updateForm, [event.target.name]: event.target.value })

    const onSubmit = async event => {
		event.preventDefault()
		const {success, message} = await updateNEWS(updateForm)
        setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
		resetUpdateData()
	}

    const resetUpdateData = () => {
		setUpdateForm(_news)
		setShowUpdateNEWSModal(false)
	}

    return (
        <Modal 
            show={showUpdateNEWSModal} 
            onHide={resetUpdateData} aria-labelledby="contained-modal-title-vcenter"
            centered
            size="lg"
        >
            <Modal.Header closeButton>
				<Modal.Title>
                    Chỉnh sửa Tin Tức
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
                            type='text' 
                            placeholder='Slug' 
                            name='slug' 
                            value={slug}
                            onChange={onChangeUpdateForm} />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Control 
                            as='textarea' 
                            placeholder='Nội dung (viết ở định dạng HTML5)' 
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

export default UpdateNEWSModal

