import {useContext, useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import AlertMessage from '../layout/AlertMessage'
import { PostContext } from '../../contexts/postContext'
const CreatePostForm = () => {

    const {addPost} = useContext(PostContext)

    const [createForm,setCreateForm] = useState({
        title: '',
        content: '',
        imageURL: '',
        slug: ''
    })

    const [alert,setAlert] = useState(null)

    const {title,content,imageURL,slug} = createForm

    const onChangeCreateForm = event => setCreateForm({...createForm, [event.target.name]:event.target.value})

    const create = async event => {
        event.preventDefault()

        const {success, message} = await addPost(createForm)

        if(success) {
            setAlert({
                type: 'success',
                message: message
            })

            setCreateForm({
                title: '',
                content: '',
                imageURL: '',
                slug: ''
            })
        } else {
            setAlert({
                type: 'danger',
                message: message
            })
        }
    }

    return (
        <>
            <Form onSubmit={create}>
                <AlertMessage info={alert} />
                    <Form.Group className='mb-3'>
                        <Form.Control 
                            type='text' 
                            placeholder='Tiêu Đề' 
                            name='title' 
                            value={title}
                            onChange={onChangeCreateForm} />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Control 
                            type='text' 
                            placeholder='Slug' 
                            name='slug' 
                            value={slug}
                            onChange={onChangeCreateForm} />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Control 
                            as='textarea' 
                            placeholder='Nội dung (viết ở định dạng HTML5)' 
                            rows='12'
                            name='content' 
                            value={content}
                            onChange={onChangeCreateForm} />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Control 
                            type='text' 
                            placeholder='Link ảnh đại diện' 
                            name='imageURL' 
                            value={imageURL}
                            onChange={onChangeCreateForm} />
                    </Form.Group>
                <Button className='mb-3' variant = 'success' type='submit'>Đăng bài</Button>
            </Form>
        </>
    )
}

export default CreatePostForm
