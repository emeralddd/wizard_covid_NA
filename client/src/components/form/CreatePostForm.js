import {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import { apiURL } from '../../utils/VariableName'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import AlertMessage from '../layout/AlertMessage'
const CreatePostForm = () => {
    const [createForm,setCreateForm] = useState({
        title: '',
        content: '',
        imageURL: ''
    })

    const createN = async createForm => {
        try {
            const response = await axios.post(`${apiURL}/admin/createBlogPost`,createForm)
            return response.data 
        } catch (error) {
            if(error.response.data) {
                return error.response.data
            }
            else return {
                success: false, 
                message: error.message
            }
        }
    }

    const [alert,setAlert] = useState(null)

    const {title,content,imageURL} = createForm

    const onChangeCreateForm = event => setCreateForm({...createForm, [event.target.name]:event.target.value})

    const create = async event => {
        event.preventDefault()

        try {
            const createData = await createN(createForm)
            if(!createData.success) {
                setAlert({
                    type: 'danger',
                    message: createData.message
                })
            } else {
                setAlert({
                    type: 'success',
                    message: createData.message
                })

                setCreateForm({
                    title: '',
                    content: '',
                    imageURL: ''
                })
            }
        } catch (error) {
            console.log(error)
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
