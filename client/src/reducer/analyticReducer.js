import { 
    ANA_LOADED_FAIL, 
    ANA_LOADED_SUCCESS, 
    UPDATE_ANA,
    FIND_ANA 
} from "../utils/VariableName"

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

        case FIND_ANA:
            return {
                ...state,
                nowAna:payload
            }
            
        case UPDATE_ANA: 
            const newAna = state.analytic.map(ana => ana.position === payload.position ? payload : ana)

            return {
                ...state,
                analytic: newAna
            }
        
        default: 
            return state
    }
}