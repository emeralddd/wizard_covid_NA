import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext,useState,useEffect } from 'react'
import { PostContext } from '../../contexts/postContext'

const UpdatePostModal = () => {

    const {
        postState:{post},
        setShowToast,
        updatePost,
        showUpdatePostModal,
        setShowUpdatePostModal
    } = useContext(PostContext)

    const [updateForm,setUpdateForm] = useState(post)

    useEffect(() => setUpdateForm(post), [post])

    const {title,content,imageURL,slug} = updateForm

    const onChangeUpdateForm = event => setUpdateForm({ ...updateForm, [event.target.name]: event.target.value })

    const onSubmit = async event => {
		event.preventDefault()
		const {success, message} = await updatePost(updateForm)
        setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
		resetUpdateData()
	}

    const resetUpdateData = () => {
		setUpdateForm(post)
		setShowUpdatePostModal(false)
	}

    return (
        <Modal 
            show={showUpdatePostModal} 
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
                    <Form.Group className='mb-3'>
                        <Form.Control 
                            type='text' 
                            placeholder='Link ảnh đại diện' 
                            name='imageURL' 
                            value={imageURL}
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

export default UpdatePostModal

