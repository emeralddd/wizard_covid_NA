import { ANA_LOADED_FAIL, ANA_LOADED_SUCCESS } from "../utils/VariableName"

export const AnalyticReducer = (state,action) => {
    const {type,payload} = action
    switch (type) {
        case ANA_LOADED_SUCCESS:
            return {
                ...state,
                analytic: payload,
                analyticLoading: false
            }
        
        case ANA_LOADED_FAIL:
            return {
                ...state,
                analytic: [],
                analyticLoading: false
            }
        
        default: 
            return state
    }
}