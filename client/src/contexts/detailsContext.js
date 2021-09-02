import { createContext,useReducer } from "react"
import { DetailsReducer } from '../reducer/detailsReducer'
import { apiURL,DETAILS_LOADED_FAIL,DETAILS_LOADED_SUCCESS } from "../utils/VariableName"
import axios from "axios"

export const DetailsContext = createContext()

const DetailsContextProvider = ({children}) => {
    const [detailsState,dispatch] = useReducer(DetailsReducer, {
        details: [],
        detailsLoading: true
    })

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

    const DetailsContextData = {detailsState, getDetails}

    return (
        <DetailsContext.Provider value={DetailsContextData}>
            {children}
        </DetailsContext.Provider>
    )
}

export default DetailsContextProvider
