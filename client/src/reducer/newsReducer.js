import { 
    NEWS_LOADED_FAIL, 
    NEWS_LOADED_SUCCESS,
    ADD_NEWS,
    DEL_NEWS,
    FIND_NEWS,
    UPDATE_NEWS 
} from "../utils/VariableName"

export const NEWSReducer = (state,action) => {
    const {type,payload} = action
    switch (type) {
        case NEWS_LOADED_SUCCESS:
            return {
                ...state,
                news: payload,
                newsLoading: false
            }
        
        case NEWS_LOADED_FAIL:
            return {
                ...state,
                news: [],
                newsLoading: false
            }
        
        case ADD_NEWS:
            return {
                ...state,
                news: [...state.news,payload]
            }

        case DEL_NEWS:
            return {
                ...state,
                news: state.news.filter(_news => _news._id !== payload)
            }

        case FIND_NEWS: 
            return {
                ...state,
                _news:payload
            }
        
        case UPDATE_NEWS:
            const newNEWS = state.news.map(_news =>
				_news._id === payload._id ? payload : _news
			)

            return {
                ...state,
                news: newNEWS
            }

        default: 
            return state
    }
}