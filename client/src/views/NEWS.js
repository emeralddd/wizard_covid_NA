import {useState, useEffect} from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
import axios from 'axios'
import { apiURL } from '../utils/VariableName'
import dateFormat from 'dateformat'

const NEWS = (props) => {
    
    const id = props.match.params.slug

    const [statusState, setStatusState] = useState({
        loading: false,
        success: 0,
        data: []
    })

    const find = async () => {
        try {
            const response = await axios.get(`${apiURL}/public/getEachNEWS/${id}`)
            if(response.data.success) {
                setStatusState({
                    loading: false,
                    success: 200,
                    data: [response.data.fetchNEWS.title,response.data.fetchNEWS.content,response.data.fetchNEWS.dateCreated,response.data.fetchNEWS.userCreated.username,response.data.fetchNEWS.slug]
                })
            }
        } catch (error) {
            setStatusState({
                loading: false,
                success: 404,
            })
        }
    }
    
    useEffect(() => {
        find()
    }, [])
    
    let body = null
    
    if(statusState.loading) {
        body = (
            <div className="d-flex-justify-content-center mt-2">
                <Spinner animation='border' variant='info' />
            </div>
        )
    } else if(statusState.success === 404) {
        body = (
            <>
                <Card className='text-center mx-5 my-5'>
                    <Card.Header as='h1'>
                        <h1>404</h1>
                        <h3>Khong Ton Tai</h3>
                    </Card.Header>
                </Card>
            </>
        )
    } else {
        body = (
            <>
                <div className='titlePost'>
                    <h1>Tin Tức</h1>
                </div>
                <h3 className='mt-3 text-center'>{statusState.data[0]}</h3>
                <h5 className='m-4 text-center'>Đăng bởi: {statusState.data[3]} - {dateFormat(statusState.data[2], "hh:mm:ss - dd/mm/yyyy")}</h5>
                <div dangerouslySetInnerHTML={{ __html: statusState.data[1] }} />
            </>
        )
    }

    return (
        <div className="mx-4 mt-3">
            {body}
        </div>
    )
}

export default NEWS
