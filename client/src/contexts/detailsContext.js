import { createContext,useReducer,useState } from "react"
import { DetailsReducer } from '../reducer/detailsReducer'
import { 
    apiURL,
    DETAILS_LOADED_FAIL,
    DETAILS_LOADED_SUCCESS,
    ADD_DETAIL,
    DEL_DETAIL,
    FIND_DETAIL,
    UPDATE_DETAIL
} from "../utils/VariableName"
import axios from "axios"

export const DetailsContext = createContext()

const DetailsContextProvider = ({children}) => {
    const [detailsState,dispatch] = useReducer(DetailsReducer, {
        detail: null,
        details: [],
        detailsLoading: true
    })

    const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null
	})

    const [showUpdateDetailModal, setShowUpdateDetailModal] = useState(false)

    const getDetails = async() => {
        try {
            const response = await axios.get(`${apiURL}/public/displayPandemicFullData`)
            if(response.data.success) {
                dispatch({
                    type: DETAILS_LOADED_SUCCESS, 
                    payload: response.data.listData
                })
            }
        } catch (error) {
            dispatch({type: DETAILS_LOADED_FAIL})
        }
    }

    const addDetails = async(newDetail) => {
        try {
            const response = await axios.post(`${apiURL}/admin/createPandemicData`,newDetail)
            if(response.data.success) {
                dispatch({
                    type: ADD_DETAIL,
                    payload: response.data.update
                })
                return response.data
            }
        } catch (error) {
            if(error.response.data) {
                return error.response.data
            } else return {
                success: false,
                message: error.message
            }
        }
    }

    const findDetail = async detailID => {
        const detail = detailsState.details.find(detail => detail._id === detailID)
        dispatch({type: FIND_DETAIL, payload: detail})
    }

    const updateDetail = async updatedDetail => {
		try {
			const response = await axios.put(`${apiURL}/admin/updatePandemicData/${updatedDetail._id}`,updatedDetail)
			if (response.data.success) {
				dispatch({ type: UPDATE_DETAIL, payload: response.data.data })
				return response.data
			}
		} catch (error) {
			if(error.response.data) {
                return error.response.data
            } else return {
                success: false, 
                message: error.message
            }
		}
	}

    const deleteDetail = async detailID => {
        console.log(detailID)
        try {
			const response = await axios.delete(`${apiURL}/admin/deletePandemicData/${detailID}`)
			if (response.data.success)
				dispatch({ type: DEL_DETAIL, payload: detailID })
		} catch (error) {
			console.log(error)
		}
    }

    const DetailsContextData = {
        detailsState, 
        getDetails, 
        addDetails,
        deleteDetail,
        findDetail,
        updateDetail,
        showUpdateDetailModal,
        setShowUpdateDetailModal,
        setShowToast,
        showToast
    }

    return (
        <DetailsContext.Provider value={DetailsContextData}>
            {children}
        </DetailsContext.Provider>
    )
}

export default DetailsContextProvider
