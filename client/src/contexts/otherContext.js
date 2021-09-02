import { createContext,useState } from "react"
import axios from "axios"

export const OtherContext = createContext()

const OtherContextProvider = ({children}) => {
    const [navState,setNavShow] = useState(false)

    const OtherContextData = {navState, setNavShow}

    return (
        <OtherContext.Provider value={OtherContextData}>
            {children}
        </OtherContext.Provider>
    )
}

export default OtherContextProvider
