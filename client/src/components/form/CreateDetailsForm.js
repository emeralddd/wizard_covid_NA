import {useContext, useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import AlertMessage from '../layout/AlertMessage'
import { DetailsContext } from '../../contexts/detailsContext'
const CreateDetailsForm = () => {

    const {addDetails} = useContext(DetailsContext)

    const [createForm,setCreateForm] = useState({
        title: 'THÔNG BÁO VỀ  CA DƯƠNG TÍNH MỚI VỚI COVID-19 TẠI NGHỆ AN',
        content: ''
    })

    const [alert,setAlert] = useState(null)

    const {title,content} = createForm

    const onChangeCreateForm = event => setCreateForm({...createForm, [event.target.name]:event.target.value})

    const create = async event => {
        event.preventDefault()
        const {success,message} = await addDetails(createForm) 
        if(success) {
            setAlert({
                type: 'success',
                message: message
            })

            setCreateForm({
                title: 'THÔNG BÁO VỀ  CA DƯƠNG TÍNH MỚI VỚI COVID-19 TẠI NGHỆ AN',
                content: ''
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
                            as='textarea' 
                            placeholder='Nội dung' 
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

export default CreateDetailsForm
