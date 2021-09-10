import { createContext,useReducer,useState } from "react"
import { NEWSReducer } from '../reducer/newsReducer'
import { 
    apiURL,
    NEWS_LOADED_FAIL,
    NEWS_LOADED_SUCCESS,
    ADD_NEWS,
    DEL_NEWS,
    FIND_NEWS,
    UPDATE_NEWS 
} from "../utils/VariableName"
import axios from "axios"

export const NEWSContext = createContext()

const NEWSContextProvider = ({children}) => {
    const [newsState,dispatch] = useReducer(NEWSReducer, {
        _news: null,
        news: [],
        newsLoading: true
    })

    const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null
	})

    const [showUpdateNEWSModal, setShowUpdateNEWSModal] = useState(false)

    const getNEWS = async() => {
        try {
            const response = await axios.get(`${apiURL}/public/displayNEWS`)
            if(response.data.success) {
                dispatch({
                    type: NEWS_LOADED_SUCCESS, 
                    payload: response.data.listNews
                })
            }
        } catch (error) {
            dispatch({type: NEWS_LOADED_FAIL})
        }
    }

    const addNEWS = async(newNEWS) => {
        try {
            const response = await axios.post(`${apiURL}/admin/createNEWS`,newNEWS)
            if(response.data.success) {
                dispatch({
                    type: ADD_NEWS,
                    payload: response.data.news
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

    const findNEWS = async newsID => {
        const news = newsState.news.find(_news => _news._id === newsID)
        dispatch({type: FIND_NEWS, payload: news})
    }

    const updateNEWS = async updatedNEWS => {
		try {
			const response = await axios.put(`${apiURL}/admin/updateNEWS/${updatedNEWS._id}`,updatedNEWS)
			if (response.data.success) {
				dispatch({ type: UPDATE_NEWS, payload: response.data.news })
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

    const deleteNEWS = async newsID => {
        try {
			const response = await axios.delete(`${apiURL}/admin/deleteNEWS/${newsID}`)
			if (response.data.success)
				dispatch({ type: DEL_NEWS, payload: newsID })
		} catch (error) {
			console.log(error)
		}
    }

    const NEWSContextData = {
        newsState, 
        getNEWS,
        addNEWS,
        deleteNEWS,
        findNEWS,
        updateNEWS,
        showUpdateNEWSModal,
        setShowUpdateNEWSModal,
        setShowToast,
        showToast 
    }

    return (
        <NEWSContext.Provider value={NEWSContextData}>
            {children}
        </NEWSContext.Provider>
    )
}

export default NEWSContextProvider
