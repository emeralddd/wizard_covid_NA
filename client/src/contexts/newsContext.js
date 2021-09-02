import { createContext,useReducer } from "react"
import { NEWSReducer } from '../reducer/newsReducer'
import { apiURL,NEWS_LOADED_FAIL,NEWS_LOADED_SUCCESS } from "../utils/VariableName"
import axios from "axios"

export const NEWSContext = createContext()

const NEWSContextProvider = ({children}) => {
    const [newsState,dispatch] = useReducer(NEWSReducer, {
        news: [],
        newsLoading: true
    })

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

    const NEWSContextData = {newsState, getNEWS}

    return (
        <NEWSContext.Provider value={NEWSContextData}>
            {children}
        </NEWSContext.Provider>
    )
}

export default NEWSContextProvider
