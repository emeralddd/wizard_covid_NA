import { createContext,useReducer,useState} from "react"
import { AnalyticReducer } from '../reducer/analyticReducer'
import { 
    apiURL,
    ANA_LOADED_FAIL,
    ANA_LOADED_SUCCESS,
    FIND_ANA,
    UPDATE_ANA 
} from "../utils/VariableName"
import axios from "axios"

export const AnalyticContext = createContext()

const AnalyticContextProvider = ({children}) => {
    const [analyticState,dispatch] = useReducer(AnalyticReducer, {
        nowAna: {
            position:'',
            total:0,
            death:0,
            cured:0
        },
        analytic: [],
        analyticLoading: true
    })

    const [showUpdateModal, setShowUpdateModal] = useState(false)
	
	const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null
	})

    const getAnalytic = async() => {
        try {
            const response = await axios.get(`${apiURL}/public/displayAnalytic`)
            if(response.data.success) {
                dispatch({
                    type: ANA_LOADED_SUCCESS, 
                    payload: response.data.listAna
                })
                //dispatch({
                   // type: FIND_ANA,
                    //payload: response.data.listAna[0]
                //})
            }
        } catch (error) {
            dispatch({type: ANA_LOADED_FAIL})
        }
    }

    const updateAnalytic = async newData => {
        try {
            const response = await axios.put(`${apiURL}/admin/updateAnalytics`,newData)
            if(response.data.success) {
                dispatch({type:UPDATE_ANA,payload:response.data.update})
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

    const findAnalytic = async anaPos => {
        const ana = analyticState.analytic.find(ana => {
            console.log(ana.position)
            return ana.position === anaPos
        })
        dispatch({type: FIND_ANA, payload: ana})
        return ana
    }

    const AnalyticContextData = {
        analyticState, 
        getAnalytic,
        showUpdateModal,
        setShowUpdateModal,
        showToast,
        setShowToast,
        findAnalytic,
        updateAnalytic
    }

    return (
        <AnalyticContext.Provider value={AnalyticContextData}>
            {children}
        </AnalyticContext.Provider>
    )
}

export default AnalyticContextProvider
