import Button from 'react-bootstrap/Button'
import {useContext} from 'react'
import {PostContext} from '../../contexts/postContext'
import {NEWSContext} from '../../contexts/newsContext'
import {DetailsContext} from '../../contexts/detailsContext'
import editIcon from '../../assets/pencil-square.svg'
import viewIcon from '../../assets/eye-fill.svg'
import delIcon from '../../assets/trash.svg'
import {Link} from 'react-router-dom'
const ActionButtons = ({_id,slug,type}) => {

    const {
        deletePost,
        findPost,
        setShowUpdatePostModal
    } = useContext(PostContext)

    const {
        deleteDetail,
        findDetail,
        setShowUpdateDetailModal
    } = useContext(DetailsContext)

    const {
        deleteNEWS,
        findNEWS,
        setShowUpdateNEWSModal
    } = useContext(NEWSContext)

    const update = ID => {
        if(type==='post') {
            findPost(ID)
            setShowUpdatePostModal(true)
        } else if(type==='detail') {
            findDetail(ID)
            setShowUpdateDetailModal(true)
        } else if(type==='news') {
            findNEWS(ID)
            setShowUpdateNEWSModal(true)
        }
    }

    const del = ID => {
        if(type==='post') {
            deletePost(ID)
        } else if(type==='detail') {
            deleteDetail(ID)
        } else if(type==='news') {
            deleteNEWS(ID)
        }
    }

    return (
        <div className='text-center'>
            {
                type==='detail'?
                null :
                <Link to={`/${type}/${slug}`}>
                    <Button variant='secondary' className='p-0'>
                        <img src={viewIcon} alt='view' />
			        </Button>
                </Link>
            }
            <Button variant='secondary' className='p-0 m-1' onClick={update.bind(this, _id)}>
                    <img src={editIcon} alt='edit'  />
			</Button>
            <Button variant='secondary' className='p-0' onClick={del.bind(this,_id)}>
                <img src={delIcon} alt='delete' />
			</Button>

            
        </div>
    )
}

export default ActionButtons
