import { createContext,useReducer } from "react"
import { AnalyticReducer } from '../reducer/analyticReducer'
import { apiURL,ANA_LOADED_FAIL,ANA_LOADED_SUCCESS } from "../utils/VariableName"
import axios from "axios"

export const AnalyticContext = createContext()

const AnalyticContextProvider = ({children}) => {
    const [analyticState,dispatch] = useReducer(AnalyticReducer, {
        analytic: [],
        analyticLoading: true
    })

    const getAnalytic = async() => {
        try {
            const response = await axios.get(`${apiURL}/public/displayAnalytic`)
            if(response.data.success) {
                dispatch({
                    type: ANA_LOADED_SUCCESS, 
                    payload: response.data.listAna
                })
            }
        } catch (error) {
            dispatch({type: ANA_LOADED_FAIL})
        }
    }

    const AnalyticContextData = {analyticState, getAnalytic}

    return (
        <AnalyticContext.Provider value={AnalyticContextData}>
            {children}
        </AnalyticContext.Provider>
    )
}

export default AnalyticContextProvider
