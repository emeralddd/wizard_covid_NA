import {useContext, useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import AlertMessage from '../layout/AlertMessage'
import { NEWSContext } from '../../contexts/newsContext'
const CreateNEWSForm = () => {

    const {addNEWS} = useContext(NEWSContext)
    
    const [createForm,setCreateForm] = useState({
        title: '',
        content: '',
        slug: ''
    })

    const [alert,setAlert] = useState(null)

    const {title,content,slug} = createForm

    const onChangeCreateForm = event => setCreateForm({...createForm, [event.target.name]:event.target.value})

    const create = async event => {
        event.preventDefault()
        const {success,message} = await addNEWS(createForm)
        if(success) {
            setAlert({
                type: 'success',
                message: message
            })

            setCreateForm({
                title: '',
                content: '',
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
                    
                <Button className='mb-3' variant = 'success' type='submit'>Đăng bài</Button>
            </Form>
        </>
    )
}

export default CreateNEWSForm
